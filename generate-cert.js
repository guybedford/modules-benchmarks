import getDevelopmentCertificate from 'devcert-sanscache';
import { writeFile } from 'fs/promises';
 
const { key, cert } = await getDevelopmentCertificate('localhost');
await writeFile('key.pem', key);
await writeFile('cert.pem', cert);
