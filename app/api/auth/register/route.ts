import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';
import { sendOTPVerificationEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }
      // If user exists but not verified, let them request a new OTP by updating the unverified user
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry

    if (existingUser) {
      existingUser.passwordHash = passwordHash;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
    } else {
      await User.create({
        email,
        passwordHash,
        otp,
        otpExpiry,
        isVerified: false
      });
    }

    // Send OTP email
    await sendOTPVerificationEmail(email, otp);

    return NextResponse.json({ message: 'Registration successful. OTP sent to email.' }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
