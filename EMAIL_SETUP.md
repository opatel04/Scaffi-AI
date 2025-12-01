# Email Setup for Feedback Feature

## Current Behavior

The feedback feature is now working! When users submit feedback:
- ✅ Form data is sent to backend API endpoint `/send-feedback`
- ✅ Backend logs feedback to console (visible in terminal)
- ✅ User sees success message
- ✅ No email client opens

## Console Logging (Default)

By default, feedback is logged to the backend console. You'll see:

```
================================================================================
FEEDBACK RECEIVED:
From: John Doe (john@example.com)
Message: Great app! Love the scaffolding feature.
================================================================================
```

This is perfect for development and testing!

## Optional: Enable Email Sending

If you want feedback sent to your email automatically, configure SMTP:

### Option 1: Gmail (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Scaffi Feedback"
   - Copy the 16-character password

3. **Update `.env` file**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=atharvazaveri4@gmail.com
SMTP_PASSWORD=your-16-char-app-password
FEEDBACK_EMAIL=atharvazaveri4@gmail.com
```

4. **Restart backend**:
```bash
cd backend
uvicorn main:app --reload
```

### Option 2: Other Email Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

**Yahoo:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
```

**Custom SMTP:**
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASSWORD=your-password
```

## Testing

1. **Start backend**:
```bash
cd backend
uvicorn main:app --reload
```

2. **Start frontend**:
```bash
cd frontend
npm run dev
```

3. **Test feedback**:
   - Click "Feedback" button
   - Fill in form
   - Submit
   - Check backend console for logged feedback
   - If SMTP configured, check your email

## Security Notes

- ⚠️ Never commit `.env` file with real passwords to git
- ✅ Use app-specific passwords, not your main email password
- ✅ The `.env` file is already in `.gitignore`
- ✅ For production, use environment variables or secrets manager

## Troubleshooting

### "Failed to send feedback"
- Check backend console for error details
- Verify SMTP credentials are correct
- Ensure 2FA is enabled and app password is used (Gmail)
- Check firewall/network allows SMTP connections

### "Cannot connect to backend"
- Ensure backend is running on port 8000
- Check CORS configuration in `main.py`
- Verify frontend API_BASE_URL is correct

### Feedback not appearing in email
- Check spam folder
- Verify FEEDBACK_EMAIL is correct
- Check backend logs for errors
- If no SMTP configured, feedback only logs to console (this is normal!)

## Production Deployment

For production, consider:
1. **SendGrid** - Free tier: 100 emails/day
2. **Mailgun** - Free tier: 5,000 emails/month
3. **AWS SES** - Very cheap, reliable
4. **Resend** - Modern, developer-friendly

These services are more reliable than SMTP for production use.
