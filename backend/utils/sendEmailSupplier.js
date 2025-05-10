const nodemailer = require("nodemailer");

const sendEmailSupplier = async (to, subject, type = "Approved") => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let html;
  let emailSubject;

  if (type === "Rejected") {
    emailSubject = "Raw Material Rejection ❌";
    html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #e53935;">Raw Material Rejection</h2>
        <p>Hello,</p>
        <p>We regret to inform you that your raw material <strong>${subject}</strong> has been <strong>Rejected</strong> by the admin.</p>
        <p>Feel free to contact the admin for more information. Thank you.</p>
        <br/>
        <p style="font-size: 0.9em; color: #777;">– BakedTato Food Ordering System</p>
      </div>`;
  } else if (type === "Deleted") {
    emailSubject = "Raw Material Deleted Permanently 🗑️";
    html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #ff9800;">Raw Material Deleted Permanently</h2>
        <p>Hello,</p>
        <p>The raw material <strong>${subject}</strong> has been <strong>permanently removed</strong> from the system by the admin.</p>
        <p>If you think this was a mistake, please contact the admin. You can now avoid supplying this raw material. </p>
        <br/>
        <p style="font-size: 0.9em; color: #777;">– BakedTato Food Ordering System</p>
      </div>`;
  } else {
    emailSubject = "Raw Material Approval ✅";
    html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4CAF50;">Raw Material Approval</h2>
        <p>Hello,</p>
        <p>Your raw material <strong>${subject}</strong> which you added to the system has been <strong>Approved</strong> by the admin.</p>
        <p>Thank you for your latest addition!</p>
        <br/>
        <p style="font-size: 0.9em; color: #777;">– BakedTato Food Ordering System</p>
      </div>`;
  }

  const mailOptions = {
    from: `"Admin - BAKEDTATO" <admin.bakedtato@gmail.com>`,
    to: to,
    subject: emailSubject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailSupplier;
