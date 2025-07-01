import { Request, Response } from 'express';


// const qrGenerator=  async (req: Request, res: Response) => {
//   const { url, pattern, corner, color } = req.body;

//   try {
//     const qr = new QRCodeStyling({
//       width: 300,
//       height: 300,
//       data: url,
//       dotsOptions: {
//         color: color || '#000000',
//         type: pattern || 'square',
//       },
//       cornersSquareOptions: {
//         type: corner || 'square',
//         color: color || '#000000',
//       },
//       backgroundOptions: {
//         color: '#FFFFFF'
//       }
//     });
//     console.log("reached qr generator");
//     const buffer = await qr.getRawData("png");
//     res.setHeader("Content-Type", "image/png");
//     res.send(buffer);

//   } catch (error) {
//     console.error('QR generation failed:', error);
//     res.status(500).json({ error: 'QR generation failed' });
//   }
// };

// export {qrGenerator}
