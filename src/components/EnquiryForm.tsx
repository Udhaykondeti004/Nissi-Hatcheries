import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { enquiryMessage, whatsappHref } from '../lib/links';

type Fields = { name: string; mobile: string; variety: string; quantity: string; message: string };
const empty: Fields = { name: '', mobile: '', variety: 'Vannamei', quantity: '', message: '' };

/** Enquiry form that opens WhatsApp with the details prefilled. No data is stored or sent anywhere else. */
export function EnquiryForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (f.name.trim().length < 2) errs.name = 'Please enter your name.';
    const digits = f.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(digits)) errs.mobile = 'Please enter a 10-digit mobile number.';
    if (!f.quantity.trim()) errs.quantity = 'Please enter the quantity you need.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.open(whatsappHref(enquiryMessage({ ...f, mobile: `+91 ${digits}` })), '_blank', 'noopener');
  }

  const label = 'block text-sm font-semibold text-ink';
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 text-sm text-crimson">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" className="field mt-2" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="mobile" className={label}>Mobile number</label>
        <input id="mobile" type="tel" inputMode="numeric" className="field mt-2" autoComplete="tel" placeholder="10-digit number" value={f.mobile} onChange={set('mobile')} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? 'mobile-err' : undefined} />
        {err('mobile')}
      </div>
      <fieldset className="sm:col-span-1">
        <legend className={label}>Shrimp variety</legend>
        <div className="mt-2 grid grid-cols-2 border border-line bg-white">
          {['Vannamei', 'Tiger'].map((v) => (
            <label key={v} className={`cursor-pointer px-3 py-3 text-center font-medium ${f.variety === v ? 'bg-ocean text-white' : 'text-ink'}`}>
              <input type="radio" name="variety" value={v} checked={f.variety === v} onChange={set('variety')} className="sr-only" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="quantity" className={label}>Quantity required</label>
        <input id="quantity" className="field mt-2" placeholder="e.g. 5 lakh seeds" value={f.quantity} onChange={set('quantity')} aria-invalid={!!errors.quantity} aria-describedby={errors.quantity ? 'quantity-err' : undefined} />
        {err('quantity')}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Message <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea id="message" rows={4} className="field mt-2" placeholder="Pond location, preferred stocking date, PL stage…" value={f.message} onChange={set('message')} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-whatsapp w-full sm:w-auto">
          <MessageCircle size={18} aria-hidden /> Send enquiry on WhatsApp
        </button>
        <p className="mt-3 text-sm text-ink-soft">Opens WhatsApp with your details filled in. Nothing is stored on this website.</p>
      </div>
    </form>
  );
}
