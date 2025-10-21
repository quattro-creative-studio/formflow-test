import type { APIRoute } from 'astro';

interface BrevoContactData {
  email: string;
  attributes: {
    FIRSTNAME: string;
    LASTNAME: string;
    NB_SITES: string;
    DEMANDE_TYPE: string;
    MESSAGE?: string;
  };
  listIds?: number[];
  updateEnabled?: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { firstName, lastName, email, nbSites, demandeType, message } = body;

    // Server-side validation
    if (!firstName || !lastName || !email || !nbSites || !demandeType) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'All required fields must be filled out.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email address.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get Brevo API key from environment
    const brevoApiKey = import.meta.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY is not set in environment variables');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Server configuration missing. Please contact the administrator.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare Brevo contact data
    const contactData: BrevoContactData = {
      email: email.toLowerCase().trim(),
      attributes: {
        FIRSTNAME: firstName.trim(),
        LASTNAME: lastName.trim(),
        NB_SITES: nbSites,
        DEMANDE_TYPE: demandeType,
      },
      updateEnabled: true, // Update contact if already exists
    };

    // Add optional message
    if (message && message.trim()) {
      contactData.attributes.MESSAGE = message.trim();
    }

    // Add to list if LIST_ID is configured
    const listId = import.meta.env.BREVO_LIST_ID;
    if (listId) {
      contactData.listIds = [parseInt(listId)];
    }

    // Send to Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const brevoData = await brevoResponse.json();

    // Handle Brevo response
    if (!brevoResponse.ok) {
      // Check if contact already exists (not an error for us)
      if (brevoResponse.status === 400 && brevoData.code === 'duplicate_parameter') {
        // Contact exists, but we updated it - that's fine
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Thank you! Your information has been successfully updated.',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      console.error('Brevo API error:', brevoData);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'An error occurred. Please try again later.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! We\'ve received your request and will contact you soon.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in brevo-submit API:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
