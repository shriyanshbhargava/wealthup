import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

type ReCAPTCHAResponse = { success: boolean; challenge_ts: string; hostname: string; score: number; action: string; 'error-codes'?: string[] };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recaptchaValue } = req.body;
  const secretKey = '6Le6b_wnAAAAACKIdOD_rmKwZNV9jgr6Y6E6HLNx';

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaValue}`, {
    method: 'POST',
  });
  const data = await response.json() as ReCAPTCHAResponse;
  
  const { success } = data;

  if (success) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
}
