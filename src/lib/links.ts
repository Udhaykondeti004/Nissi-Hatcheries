import { business } from '../content/business';

export const telHref = (e164: string) => `tel:${e164}`;

/** wa.me link with a prefilled message (opens WhatsApp app on phones, WhatsApp Web on desktop). */
export function whatsappHref(message: string): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  'Hello Nissi Hatcheries, I would like to know the latest shrimp seed rates and availability.';

export function enquiryMessage(fields: {
  name: string;
  mobile: string;
  variety: string;
  quantity: string;
  message: string;
}): string {
  const lines = [
    'Hello Nissi Hatcheries, I have a seed enquiry.',
    '',
    `Name: ${fields.name}`,
    `Mobile: ${fields.mobile}`,
    `Variety: ${fields.variety}`,
    `Quantity required: ${fields.quantity}`,
  ];
  if (fields.message.trim()) lines.push(`Message: ${fields.message.trim()}`);
  return lines.join('\n');
}
