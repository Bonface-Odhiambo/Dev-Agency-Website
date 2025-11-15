import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send contact form notification to admin
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
            .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎉 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${contactData.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
              </div>
              
              ${contactData.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${contactData.phone}</div>
              </div>
              ` : ''}
              
              ${contactData.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${contactData.company}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${contactData.message}</div>
              </div>
              
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from your Kalocode website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending contact notification:', error);
    return { success: false, error: error.message };
  }
};

// Send auto-reply to contact form submitter
export const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: contactData.email,
      subject: 'Thank you for contacting Kalocode',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .message { background: white; padding: 20px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #667eea; }
            .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Kalocode</h1>
              <p>Thank you for reaching out!</p>
            </div>
            <div class="content">
              <p>Hi ${contactData.name},</p>
              
              <p>Thank you for contacting Kalocode. We've received your message and will get back to you within 24 hours.</p>
              
              <div class="message">
                <strong>Your message:</strong>
                <p>${contactData.message}</p>
              </div>
              
              <p>In the meantime, feel free to:</p>
              <ul>
                <li>Check out our portfolio of projects</li>
                <li>Learn more about our services</li>
                <li>Connect with us on social media</li>
              </ul>
              
              <p>For urgent matters, you can reach us at:</p>
              <ul>
                <li>📞 Phone: +1 (754) 242-7030</li>
                <li>💬 WhatsApp: +1 (754) 242-7030</li>
              </ul>
              
              <p>Best regards,<br><strong>The Kalocode Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Kalocode. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending auto-reply:', error);
    return { success: false, error: error.message };
  }
};

// Send team assignment notification to client
export const sendTeamAssignmentEmail = async (clientData, teamMemberData, projectData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: clientData.email,
      subject: `Team Assigned to Your Project: ${projectData.projectName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .team-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .project-info { background: white; padding: 15px; border-radius: 4px; margin: 15px 0; }
            .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
            .value { color: #333; }
            .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Great News!</h1>
              <p>A team member has been assigned to your project</p>
            </div>
            <div class="content">
              <p>Hi ${clientData.name},</p>
              
              <p>We're excited to inform you that a team member has been assigned to work on your project!</p>
              
              <div class="project-info">
                <div class="label">Project Name:</div>
                <div class="value">${projectData.projectName}</div>
              </div>
              
              <div class="team-card">
                <h3 style="margin-top: 0; color: #667eea;">👨‍💻 Your Assigned Team Member</h3>
                <div style="margin: 10px 0;">
                  <div class="label">Name:</div>
                  <div class="value">${teamMemberData.name}</div>
                </div>
                <div style="margin: 10px 0;">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${teamMemberData.email}">${teamMemberData.email}</a></div>
                </div>
                <div style="margin: 10px 0;">
                  <div class="label">Role:</div>
                  <div class="value">${teamMemberData.role === 'admin' ? 'Project Manager' : 'Senior Developer'}</div>
                </div>
              </div>
              
              <div class="project-info">
                <div class="label">Service Type:</div>
                <div class="value">${projectData.serviceType}</div>
              </div>
              
              ${projectData.budgetRange ? `
              <div class="project-info">
                <div class="label">Budget Range:</div>
                <div class="value">${projectData.budgetRange}</div>
              </div>
              ` : ''}
              
              ${projectData.expectedTimeline ? `
              <div class="project-info">
                <div class="label">Expected Timeline:</div>
                <div class="value">${projectData.expectedTimeline}</div>
              </div>
              ` : ''}
              
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>Your team member will review your project requirements</li>
                <li>You'll receive updates on project progress</li>
                <li>Feel free to reach out to your team member directly</li>
                <li>Check your dashboard for real-time updates</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="button">
                  View Dashboard
                </a>
              </div>
              
              <p>If you have any questions or concerns, don't hesitate to reach out to us.</p>
              
              <p>Best regards,<br><strong>The Kalocode Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Kalocode. All rights reserved.</p>
              <p>📞 +1 (754) 242-7030 | 💬 WhatsApp: +1 (754) 242-7030</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Team assignment email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending team assignment email:', error);
    return { success: false, error: error.message };
  }
};

export default {
  sendContactNotification,
  sendAutoReply,
  sendTeamAssignmentEmail
};
