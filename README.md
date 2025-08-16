# Xeinst v1: Shopify for AI Agents

A hosted storefront platform for selling and running AI agents. Built with Next.js 14, TypeScript, Prisma, and Stripe.

## Features

### Core v1 Features
- **Authentication & Roles**: NextAuth with Google OAuth and email magic links
- **Creator Onboarding**: Stripe Connect integration for payouts
- **Agent Management**: Create, publish, and manage AI agents
- **Payment Processing**: Stripe Checkout for one-time and subscription payments
- **Agent Execution**: Webhook-based agent execution with HMAC security
- **Analytics**: Basic event tracking and dashboard metrics
- **Admin Panel**: Agent moderation and creator verification

### Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + React Server Components
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Prisma ORM + PostgreSQL
- **Authentication**: NextAuth.js with Prisma adapter
- **Payments**: Stripe Checkout + Customer Portal + Stripe Connect
- **Validation**: Zod schemas + react-hook-form
- **Deployment**: Vercel-ready

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Supabase, Neon, or local)
- Stripe account with Connect enabled
- Google OAuth credentials (optional)

### 1. Clone and Install
```bash
git clone <repository-url>
cd xeinst
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/xeinst"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (for magic links)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"

# Stripe
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
STRIPE_PLATFORM_FEE_BPS=500

# App
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Database Schema

### Core Models
- **User**: Authentication and role management
- **Creator**: Stripe Connect integration and profile
- **Agent**: AI agent listings with pricing and execution config
- **Order**: Payment records and transaction history
- **Entitlement**: User access rights to agents
- **AgentRun**: Execution logs and results
- **Event**: Analytics and tracking events

### Key Relationships
- Users can be BUYER, CREATOR, or ADMIN
- Creators must complete Stripe Connect onboarding
- Agents belong to creators and have execution configs
- Entitlements grant users access to agents
- Runs track agent executions with results

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in with email or Google
- `GET /api/auth/session` - Get current session

### Agents
- `GET /api/agents` - List public agents with filters
- `POST /api/agents` - Create new agent (creator only)
- `GET /api/agents/[id]` - Get agent details
- `PATCH /api/agents/[id]` - Update agent (creator only)

### Payments
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

### Execution
- `POST /api/run` - Execute agent with payload

## Agent Execution Flow

1. **User Authentication**: Verify user has active entitlement
2. **Payload Validation**: Validate input against agent's demoParams
3. **Webhook Call**: POST to creator's webhookUrl with signed payload
4. **Response Handling**: Store result and update run status
5. **Event Tracking**: Log success/error events for analytics

### Webhook Payload Format
```json
{
  "agentId": "agent_123",
  "buyerId": "user_456", 
  "runId": "run_789",
  "payload": { "input": "data" },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### HMAC Signature
- Header: `x-xeinst-signature: sha256=<signature>`
- Body: HMAC-SHA256 of JSON payload with webhookSecret

## Creator Onboarding

1. **Sign Up**: Create account with email or Google
2. **Become Creator**: Upgrade role to CREATOR
3. **Stripe Connect**: Complete onboarding via Stripe
4. **Create Agents**: Build and publish AI agents
5. **Receive Payouts**: Automatic revenue sharing via Connect

## Development

### Database Commands
```bash
# View database in browser
npm run db:studio

# Reset and seed database
npm run db:push
npm run db:seed
```

### Stripe Webhook Testing
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random string for session encryption
- `STRIPE_SECRET_KEY`: Stripe secret key (test/live)
- `STRIPE_WEBHOOK_SECRET`: Webhook endpoint secret
- `STRIPE_PLATFORM_FEE_BPS`: Platform fee in basis points (500 = 5%)

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Database Setup
- Use Supabase, Neon, or Vercel Postgres
- Run migrations: `npm run db:push`
- Seed data: `npm run db:seed`

### Stripe Configuration
1. Set up webhook endpoint: `https://your-domain.com/api/stripe/webhook`
2. Configure Connect settings in Stripe dashboard
3. Update environment variables with live keys

## Security Features

- **HMAC Signatures**: Secure webhook communication
- **Role-based Access**: Creator/admin authorization
- **Input Validation**: Zod schema validation
- **Rate Limiting**: Basic API protection
- **Secure Secrets**: Hashed webhook secrets

## Roadmap (v2)

- [ ] Built-in LLM hosting
- [ ] Make/n8n integrations
- [ ] Advanced affiliate network
- [ ] Marketplace SEO optimization
- [ ] In-app messaging
- [ ] Advanced analytics dashboard

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues:
- Create GitHub issue
- Check documentation in `/docs` folder
- Review Stripe Connect documentation

---

Built with ❤️ for the AI agent ecosystem
