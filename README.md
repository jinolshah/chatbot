```markdown
### Setup Instructions

#### Local Development

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/jinolshah/chatbot
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables:
     - `APP_NAME`
     - `EMAIL_SERVER_USER`
     - `EMAIL_SERVER_PASSWORD`
     - `EMAIL_SERVER_HOST`
     - `EMAIL_SERVER_PORT`
     - `EMAIL_FROM`
     - `MONGODB_URI`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`
     - `OPENAI_API_KEY`
     - `MIXPANEL_PROJECT_TOKEN`

4. **Run the Application:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Visit [http://localhost:3000](http://localhost:3000) in your web browser to access the chatbot application.

#### Deployment

1. **Deploy on Vercel:**
   - Get a Vercel account.
   - Connect your GitHub repository to Vercel.
   - Follow the deployment instructions provided by Vercel to deploy the application.

2. **Configure Environment Variables on Vercel:**
   - In the Vercel dashboard, navigate to your project's settings.
   - Add environment variables similar to the local setup.
```
