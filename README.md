# 📬 Lead Generation System


A full-stack lead generation system that collects user data from a frontend form, saves it to a MongoDB database, and forwards the data to an n8n webhook for automated email notifications.

---
##🔗 Live Demo
Published Link: leadgeneration.ccbp.tech

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local or Atlas)
- **Automation:** n8n (Workflow automation tool)
- **Deployment:** Render (Backend)

---

## 📁 Folder Structure

Lead-Generator/
│
├── src/
│ ├── controllers/
│ │ └── leadController.js # Handles lead creation logic
│ ├── models/
│ │ └── Lead.js # MongoDB schema
│ ├── routes/
│ │ └── leadRoutes.js # API routes
│ └── server.js # Express server
│
├── public/
│ └── index.html # Frontend form
│
├── .env # Environment variables
├── package.json
└── README.md # Project documentation

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YadhagiriPonnada/Lead-Generator-To-Mail.git
cd Lead-Generator-To-Mail
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure environment variables
Create a .env file in the root directory with the following content:

env
Copy
Edit
PORT=10000
MONGODB_URI=mongodb://localhost:27017/leadsDB   # or MongoDB Atlas URI
N8N_WEBHOOK_URL=https://yadhagiri.app.n8n.cloud/webhook/leads
✅ Replace the N8N_WEBHOOK_URL with your actual working webhook from your n8n instance.

4. Start the backend server
bash
Copy
Edit
node src/server.js
The backend will start on http://localhost:10000.

🖥️ Frontend Form
public/index.html contains a basic form that submits data to the backend:

html
Copy
Edit
<form action="/api/leads" method="POST">
  <input name="name" placeholder="Your Name" required />
  <input name="email" type="email" placeholder="Your Email" required />
  <input name="company" placeholder="Company Name" />
  <textarea name="message" placeholder="Your Message"></textarea>
  <button type="submit">Submit</button>
</form>
📬 Email Automation using n8n
Steps to Set Up n8n:
Create a Workflow

Add a Webhook Node (Method: POST).

Add an Email Node to send the data via email.

Use these expressions in your email content:

html
Copy
Edit
<p><strong>Name:</strong> {{$json["name"]}}</p>
<p><strong>Email:</strong> {{$json["email"]}}</p>
<p><strong>Company:</strong> {{$json["company"]}}</p>
<p><strong>Message:</strong> {{$json["message"]}}</p>
Activate the workflow and use the production webhook URL in your .env.

📦 API Reference
POST /api/leads
Accepts name, email, company, message

Saves data to MongoDB

Forwards the same data to n8n webhook

Sample request body:

json
Copy
Edit
{
  "name": "Samuel",
  "email": "pydipraveenkumar7@gmail.com",
  "company": "TechBridge",
  "message": "Interested in a demo"
}
🌍 Deployment (Render)
Push the project to a GitHub repository.

Connect your GitHub repo to Render.

Set these environment variables in Render Dashboard:

env
Copy
Edit
PORT=10000
MONGODB_URI=your_mongodb_uri
N8N_WEBHOOK_URL=https://yadhagiri.app.n8n.cloud/webhook/leads
Deploy the service.

✅ Done!
Now your system is ready to:

Accept leads from users via form

Save to MongoDB

Automatically send emails using n8n.
