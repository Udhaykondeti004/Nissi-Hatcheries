/**
 * Coastal Aquaculture Authority (CAA) registration, as shown in the CAA
 * "List of CAA Approved Hatcheries" (Andhra Pradesh › Kakinada), checked 2026-11-21.
 * Only facts present in that public record are listed here.
 */
export const caa = {
  registrationNumber: '56-9(179)/2022',
  registeredName: 'M/s. NISSI HATCHERIES',
  registeredLocation: 'Ponnada, U. Kothapalli, Kakinada, Andhra Pradesh',
  dateOfIssue: '07-07-2022',
  validUpTo: '31-03-2027',
  /** ISO form of the validity date, used to stop claiming validity after it lapses. */
  validUpToISO: '2027-03-31',
  speciesPermitted: 'SPF Litopenaeus vannamei',
  hatcheryType: 'Nauplii Rearing Hatchery (NRH)',
  authority: 'Coastal Aquaculture Authority, Government of India',
  verifyUrl: 'https://caa.gov.in/',
} as const;

/** True while the published validity date has not passed. */
export function caaIsCurrent(today = new Date()): boolean {
  return today <= new Date(`${caa.validUpToISO}T23:59:59+05:30`);
}
