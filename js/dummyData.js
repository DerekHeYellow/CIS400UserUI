import { putBusinessProfile } from './fetchData';

// FOR DEV PURPOSES
async function putDummyBusinessProfiles() {
  await putBusinessProfile('kims', {
    businessName: 'Kim\'s',
    latitude: 12,
    longitude: 31,
    addressNumber: 3900,
    addressStreet: 'Walnut St',
    addressCity: 'Phildelphia',
    addressState: 'PA',
    addressZIP: '19104',
    description: 'Chinese Food Truck',
    phoneNumber: '13242134',
    businessEmail: 'kims@gmail.com',
    businessHours: 'M-F: 9AM - 3PM',
  });
  await putBusinessProfile('magicCarpet', {
    businessName: 'Magic Carpet',
    latitude: 12,
    longitude: 23,
    addressNumber: 3832,
    addressStreet: 'Chestnut St',
    addressCity: 'Phildelphia',
    addressState: 'PA',
    addressZIP: '19104',
    description: 'Middle Eastern Food Truck',
    phoneNumber: '(232) 131-2343',
    businessEmail: 'magiccarpet@gmailcom',
    businessHours: 'M-F: 9AM - 3PM',
  });
}

export {
  putDummyBusinessProfiles as default,
};
