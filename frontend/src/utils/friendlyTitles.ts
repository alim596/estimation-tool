// friendlyTitles.ts

/**
 * Maps raw item titles from the JSON to more user-friendly labels.
 * Falls back to the original title if not found in this map.
 */
export const FRIENDLY_TITLES: Record<string, string> = {
    // --- App size ---
    "Small": "Small",
    "Medium": "Medium",
    "Large": "Large",
  
    // --- UI Level ---
    "MVP": "MVP",
    "Basic": "Basic",
    "Polished": "Polished",
  
    // --- Users & Accounts ---
    "Email/Password Sign up": "Email/Password",
    "Facebook Sign Up": "Facebook",
    "Twitter Sign Up": "Twitter",
    "Google Sign Up": "Google",
    "LinkedIn Sign Up": "LinkedIn",
    "GitHub Sign Up": "GitHub",
    "User Invitation Emails": "User Invitations",
    "Subdomains": "Subdomains",
    "Custom Domains": "Custom Domains",
  
    // --- User Generated Content ---
    "Dashboard": "Dashboard",
    "Activity Feed": "Activity Feed",
    "Media Uploading": "Media Upload",
    "User Profiles": "User Profiles",
    "Transactional Emails": "Transactional Emails",
    "Tags": "Tags",
    "Ratings or Reviews": "Ratings/Reviews",
    "Media Manipulation": "Media Manipulation",
    "Searching": "Search",
  
    // --- Dates & Locations ---
    "Calendaring": "Calendar",
    "Display of Map Data": "Map Display",
    "Geolocation": "Location",
    "Bookings": "Bookings",
  
    // --- Social & Engagement ---
    "Messaging": "Messaging",
    "Forums or Commenting": "Forums/Comments",
    "Social Sharing": "Social Sharing",
    "Push to Facebook Open Graph": "Facebook Open Graph",
    "Push Notifications": "Push Notifications",
  
    // --- Billing & eCommerce ---
    "Subscription Plans": "Subscription Plans",
    "Shopping Cart": "Shopping Cart",
    "User Marketplace": "Marketplace",
    "In-App Purchasing": "In-App Purchasing",
    "Payment Information Collection": "Payment Info",
    "Payment Processing": "Payment Processing",
    "Product Management": "Product Management",
  
    // --- Admin, Feedback, Analytics ---
    "CMS Integration": "CMS Integration",
    "User Admin Pages": "User Admin",
    "Moderation/Content Approval": "Moderation",
    "Support": "Support",
    "Usage Analytics": "Usage Analytics",
    "Crash Reporting": "Crash Reporting",
    "Performance Monitoring": "Performance Monitoring",
    "Multilingual Support": "Multilingual",
  
    // --- External APIs and Integrations ---
    "Connect to one or more third-party services": "3rd Party Services",
    "An API for others to integrate with your app": "Public API",
    "SMS Messaging": "SMS",
    "Phone Number Masking": "Phone Masking",
  
    // --- Security Hours ---
    "SSL Certificate based Security": "SSL Security",
    "DDoS Protection": "DDoS Protection",
    "Two Factor Authentication": "2FA",
  
    // --- Mobile Specific Features ---
    "App Specific Development": "App Dev",
    "Project Manager": "Project Manager",
  };
  