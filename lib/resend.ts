import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

let resend: Resend;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  // Create a dummy client for build time - will fail at runtime if used without env vars
  resend = new Proxy({} as Resend, {
    get() {
      throw new Error("Missing RESEND_API_KEY environment variable");
    },
  });
}

export { resend };
