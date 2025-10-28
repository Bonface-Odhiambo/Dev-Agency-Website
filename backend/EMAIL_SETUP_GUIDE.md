# Email Service Configuration Guide

## ✅ Email Service is Now Configured!

The email service has been successfully set up for team assignment notifications. Here's everything you need to know:

---

## 📧 What's Been Implemented

### 1. **Team Assignment Email**
- Beautiful HTML email template
- Includes team member details (name, email, role)
- Shows project information
- Link to dashboard
- Professional branding

### 2. **Email Functions Available**
- `sendContactNotification()` - Admin notification for contact forms
- `sendAutoReply()` - Auto-reply to contact form submitters
- `sendTeamAssignmentEmail()` - Client notification when team is assigned ✨ NEW

### 3. **Integration Complete**
- Email service integrated with team assignment endpoint
- Automatic email sending when admin assigns team
- Error handling (assignment succeeds even if email fails)
- Console logging for debugging

---

## 🔧 Email Configuration (Already Set Up)

Your `.env` file should have these variables:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=principalresearcher138@gmail.com
EMAIL_PASSWORD=xdwjppsffhscsblw
EMAIL_FROM=noreply@functioncall.com
CONTACT_EMAIL=contact@functioncall.com
FRONTEND_URL=http://localhost:5173
```

---

## 🎯 How It Works

### When Admin Assigns Team:

1. **Admin Action:**
   - Opens service request
   - Clicks "Assign Team"
   - Selects team member
   - Clicks "Assign"

2. **Backend Processing:**
   ```javascript
   // 1. Update database
   serviceRequest.assignedTo = teamMemberId;
   await serviceRequest.save();
   
   // 2. Create notification
   await Notification.create({...});
   
   // 3. Send email
   await sendTeamAssignmentEmail(clientData, teamMemberData, projectData);
   ```

3. **Client Receives:**
   - ✅ Dashboard notification
   - ✅ Email notification
   - ✅ Team member contact info

---

## 📧 Email Providers Supported

### Gmail (Current Setup)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password  # Use App Password, not regular password
```

**How to get Gmail App Password:**
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable it)
3. App Passwords → Generate new password
4. Use that password in EMAIL_PASSWORD

### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

### Mailgun
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASSWORD=your-mailgun-password
```

### AWS SES
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-ses-smtp-username
EMAIL_PASSWORD=your-ses-smtp-password
```

---

## 🧪 Testing the Email Service

### Test Team Assignment Email:

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Login as Admin**

3. **Assign Team to a Request:**
   - Go to Admin Panel
   - Click "Service Requests"
   - Click "View" on any request
   - Click "Assign Team"
   - Select a team member
   - Click "Assign"

4. **Check:**
   - ✅ Console logs: "✅ Team assignment email sent"
   - ✅ Client's email inbox
   - ✅ Client's dashboard notifications

### Test Contact Form Emails:

```bash
# Already working - test via contact form on website
```

---

## 🐛 Troubleshooting

### Email Not Sending?

**1. Check Console Logs:**
```bash
# Look for:
✅ Team assignment email sent: <message-id>
# Or:
❌ Error sending team assignment email: <error>
```

**2. Verify Environment Variables:**
```bash
# In backend directory
cat .env | grep EMAIL
```

**3. Test SMTP Connection:**
```javascript
// Add this to test your SMTP settings
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Error:', error);
  } else {
    console.log('✅ SMTP Server is ready');
  }
});
```

**4. Common Issues:**

| Issue | Solution |
|-------|----------|
| "Invalid login" | Use App Password for Gmail, not regular password |
| "Connection timeout" | Check EMAIL_HOST and EMAIL_PORT |
| "Self-signed certificate" | Set EMAIL_SECURE=false for port 587 |
| "Rate limit exceeded" | Wait a few minutes or upgrade email provider |

---

## 📝 Email Template Customization

### Modify Team Assignment Email:

Edit: `backend/services/emailService.js`

```javascript
export const sendTeamAssignmentEmail = async (clientData, teamMemberData, projectData) => {
  // Customize the HTML template here
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: clientData.email,
    subject: `Team Assigned to Your Project: ${projectData.projectName}`,
    html: `
      <!-- Your custom HTML here -->
    `
  };
  // ...
};
```

### Add Your Branding:
- Update colors in CSS
- Add your logo URL
- Change footer text
- Modify button styles

---

## 🚀 Production Recommendations

### 1. **Use Professional Email Service**
- SendGrid (12,000 free emails/month)
- Mailgun (5,000 free emails/month)
- AWS SES (62,000 free emails/month for 1 year)

### 2. **Set Up Domain Email**
- Use your own domain (e.g., noreply@functioncall.com)
- Improves deliverability
- Looks more professional

### 3. **Email Best Practices**
- ✅ Use descriptive subject lines
- ✅ Include unsubscribe link (if sending marketing emails)
- ✅ Test on multiple email clients
- ✅ Monitor bounce rates
- ✅ Keep emails under 100KB

### 4. **Security**
- Never commit `.env` file to Git
- Use environment variables in production
- Rotate email passwords regularly
- Enable 2FA on email account

---

## 📊 Monitoring

### Check Email Logs:
```bash
# Backend console will show:
✅ Team assignment email sent: <message-id>
✅ Contact notification email sent: <message-id>
✅ Auto-reply email sent: <message-id>
```

### Track Email Delivery:
- Most email providers have dashboards
- Monitor open rates, click rates, bounces
- Set up webhooks for delivery status

---

## 🎉 You're All Set!

Your email service is fully configured and ready to use. When admins assign team members to projects, clients will automatically receive:

1. ✅ Dashboard notification
2. ✅ Beautiful email with team member details
3. ✅ Direct link to view their dashboard

**Test it now by assigning a team member to a service request!**

---

## 📞 Support

If you need help:
1. Check console logs for errors
2. Verify `.env` configuration
3. Test SMTP connection
4. Review email provider documentation

Happy coding! 🚀
