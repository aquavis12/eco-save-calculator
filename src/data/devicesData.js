const devices = [
 {
   Name: "Mouse",
   weight: 100,
   category:"IT Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/mouseicon.png",
   materials: {
     aluminum: 7.5,  // average of 5–10g
     copper: 12.5,   // average of 10–15g
     lead: 0,
     plastic: 75     // average of 70–80g
     
   },
   notes: "Copper in wires, aluminum in casing, plastic makes up most of the body."
 },
 {
   Name: "Keyboard",
   category:"IT Equipment",
   weight: 500,
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/keyboardicon.png",
   materials: {
     aluminum: 37.5,  // average of 25–50g
     copper: 37.5,    // average of 25–50g
     lead: 0,
     plastic: 425     // average of 400–450g
   },
   notes: "Copper in wiring, aluminum or plastic in the casing."
 },
 {
   Name: "Routers",
   weight: 300,
   category:"IT Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/routericon.png",
   materials: {
     aluminum: 10,    // average of 5–15g
     copper: 37.5,    // average of 30–45g
     lead: 0,
     plastic: 215     // average of 200–230g
   },
   notes: "Aluminum or plastic casing, copper in wiring and internal circuitry."
 },
 {
   Name: "Modems",
   weight: 200,
   category:"IT Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/modemicon.png",
   materials: {
     aluminum: 7.5,   // average of 5–10g
     copper: 25,      // average of 20–30g
     lead: 0,
     plastic: 160     // average of 150–170g
   },
   notes: "Similar to routers, with aluminum/plastic casings and copper wiring."
 },
 {
   Name: "Computer Desktop (PC)",
   weight: 10000,
   category:"IT Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/computericon.png",
   materials: {
     aluminum: 1250,  // average of 1,000–1,500g
     copper: 1500,    // average of 1,000–2,000g
     lead: 0,
     plastic: 6500    // average of 6,000–7,000g
   },
   notes: "Aluminum case, copper in components, plastic in the casing and cooling system."
 },
 {
   Name: "Speakers",
   weight: 500,
   category:"IT Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/speakericon.png",
   materials: {
     aluminum: 27.5,  // average of 5–50g
     copper: 75,      // average of 50–100g
     lead: 0,
     plastic: 375     // average of 350–400g
   },
   notes: "Copper in wiring and magnets, aluminum/plastic in casing, and speaker cones."
 },
 {
   Name: "Webcam",
   weight: 100,
   category:"IT Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/webcamicon.png",
   materials: {
     aluminum: 3,     // average of 1–5g
     copper: 12.5,    // average of 10–15g
     lead: 0,
     plastic: 85      // average of 80–90g
   },
   notes: "Aluminum/plastic in casing, copper in wiring and circuitry."
 },
 {
   Name: "LCD/LED TVs",
   weight: [5000, 10000],  // Weight range; average can be calculated later
   category: "Home Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/smart-tv.png",
   materials: {
     aluminum: 300,    // average of 200–400g
     copper: 750,      // average of 500–1,000g
     lead: 0,
     plastic: 6000     // average of 4,000–8,000g
   },
   notes: "Aluminum in casing and frame, copper in wiring and internal components, plastic in the casing."
 },
 {
   Name: "Laptops",
   category:"IT Equipment",
   weight: 2000,
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/laptopicon.png",
   materials: {
     aluminum: 200,    // average of 100–300g
     copper: 175,      // average of 100–250g
     lead: 0,
     plastic: 1650     // average of 1,500–1,800g
   },
   notes: "Aluminum casing, copper in internal components, plastic in keyboard and covers."
 },
 {
   Name: "Mobiles",
   weight: 200,
   category:"Mobile Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/mobileicon.png",
   materials: {
     aluminum: 7.5,    // average of 5–10g
     copper: 15,       // average of 10–20g
     lead: 0,
     plastic: 160      // average of 150–170g
   },
   notes: "Aluminum or plastic casing, copper in internal wiring and circuits."
 },
 {
   Name: "Mobile Chargers",
   weight: 50,
   category:"Mobile Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/charger.png",
   materials: {
     aluminum: 0,
     copper: 12.5,     // average of 10–15g
     lead: 0,
     plastic: 35       // average of 30–40g
   },
   notes: "Copper wiring with plastic casing."
 },
 {
   Name: "Power Banks",
   weight: 300,
   category:"Mobile Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/power-bank.png",
   materials: {
     aluminum: 15,     // average of 10–20g
     copper: 40,       // average of 30–50g
     lead: 0,
     plastic: 260      // average of 250–270g
   },
   notes: "Aluminum casing, copper in internal components and wiring."
 },
 {
   Name: "Microwave",
   weight: 15000,
   category: "Home Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/oven.png",
   materials: {
     aluminum: 750,    // average of 500–1,000g
     copper: 1250,     // average of 1,000–1,500g
     lead: 150,        // average of 100–200g
     plastic: 12750    // average of 12,000–13,500g
   },
   notes: "Aluminum/plastic casing, copper in wiring, lead in some components (e.g., the transformer)."
 },
 {
   Name: "Oven",
   weight: 25000,
   category: "Home Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/oven.png",
   materials: {
     aluminum: 1250,   // average of 1,000–1,500g
     copper: 1750,     // average of 1,500–2,000g
     lead: 150,        // average of 100–200g
     plastic: 21000    // average of 20,000–22,000g
   },
   notes: "Aluminum/plastic casing, copper wiring, minimal lead."
 },
 {
   Name: "USBs",
   weight: 30,
   category:"IT Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/usb-drive.png",
   materials: {
     aluminum: 0,
     copper: 7.5,      // average of 5–10g
     lead: 0,
     plastic: 22.5     // average of 20–25g
   },
   notes: "Copper in internal wiring, plastic or aluminum casing."
 },
 {
   Name: "Bulbs (Incandescent/LED)",
   weight: 50,
   category:"Home Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/light-bulbs.png",
   materials: {
     aluminum: 0,
     copper: 7.5,      // average of 5–10g
     lead: 0,
     plastic: 42.5     // average of 40–45g
   },
   notes: "Incandescent bulbs have copper filaments; LED bulbs use aluminum for heat dissipation, plastic casing."
 },
 {
   Name: "Tube Lights",
   weight: 100,
   category:"Home Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/creative.png",
   materials: {
     aluminum: 7.5,    // average of 5–10g
     copper: 12.5,     // average of 10–15g
     lead: 0,
     plastic: 80       // average of 75–85g
   },
   notes: "Copper in internal wiring, aluminum or plastic casing."
 },
 {
   Name: "Remotes",
   weight: 100,
   category: "Home Equipment",
   image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/remote-control.png",
   materials: {
     aluminum: 3,     // average of 1–5g
     copper: 7.5,     // average of 5–10g
     lead: 0,
     plastic: 85      // average of 80–90g
   },
   notes: "Copper in the internal circuitry and connections, plastic casing."
 },
 {
  Name: "CRT TVs",
  category: "Home Equipment",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/television.png",
  materials: {
    aluminum: 10,   // average of 5–15g (casing and frame)
    copper: 30,     // average of 20–40g (wiring and internal components)
    lead: 200,      // average of 150–250g (typically in glass and components)
    plastic: 200    // average of 150–250g (casing and external parts)
  }
},
{
  Name: "Fridges",
  category: "Home Equipment",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/fridge.png",
  materials: {
    aluminum: 500,   // average of 400–600g (in internal components and casing)
    copper: 300,     // average of 200–400g (wiring, condenser coils)
    lead: 100,       // average of 50–150g (in lead-based soldering or insulation)
    plastic: 3000    // average of 2500–3500g (external casing, shelves, etc.)
  }
},
{
  Name: "Printers",
  category: "IT Equipment",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/printer.png",
  materials: {
    aluminum: 50,    // average of 30–70g (in components and casing)
    copper: 100,     // average of 80–150g (wires, circuits)
    lead: 10,        // average of 5–20g (solder or small internal components)
    plastic: 700     // average of 600–800g (plastic casing, trays)
  }
},

{
  Name: "Wireless Earphones",
  category: "Mobile Equipment",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/wireless.png",
  materials: {
    aluminum: 5,      // average of 3–8g (casing or small internal components)
    copper: 10,      // average of 5–15g (internal wiring and circuitry)
    lead: 0,         // minimal or none in wireless versions
    plastic: 40      // average of 30–50g (body, earbuds, buttons)
  }
},
{
  Name: "Wired Earphones",
  category: "Mobile Equipment",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/wired.jpg",
  materials: {
    aluminum: 3,      // average of 1–5g (small parts, casing)
    copper: 15,      // average of 10–20g (wiring)
    lead: 0,         // no lead in typical wired earphones
    plastic: 30      // average of 25–35g (earbuds, casing, buttons)
  }
},
{
  Name: "Bluetooth Earphones",
  category: "Mobile Equipment",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/download.png",
  materials: {
    aluminum: 5,      // average of 3–8g (small internal parts or casing)
    copper: 10,      // average of 5–15g (internal circuitry, wiring)
    lead: 0,         // minimal or none in Bluetooth versions
    plastic: 45      // average of 35–50g (body, earbuds, controls)
  }
},

{
  Name: "Lead-Acid Battery",
  category: "Batteries",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/battery.png",
  materials: {
    aluminum: 0.2,     // average of 1-2%
    copper: 0.3,       // average of 2-3%
    lead: 0.65,        // average of 60-70%
    plastic: 0.30      // remainder in plastic casing and separator
  }
},
{
  Name: "Lithium-Ion Battery",
  category: "Batteries",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/battery.png",
  materials: {
    aluminum: 0.12,    // average of 10-15%
    copper: 0.20,      // average of 15-25%
    lead: 0,         // no lead in lithium-ion batteries
    plastic: 0.68      // remainder in plastic casing, separators
  }
},
{
  Name: "Nickel-Metal Hydride (NiMH) Battery",
  category: "Batteries",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/battery.png",
  materials: {
    aluminum: 0.7,     // average of 5-10%
    copper: 0.12,      // average of 10-15%
    lead: 0,         // no lead in NiMH batteries
    plastic: 0.81      // remainder in plastic casing and separators
  }
},
{
  Name: "Alkaline Battery",
  category: "Batteries",
  image:"https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/icons/battery.png",
  materials: {
    aluminum: 0.3,     // average of 3-5%
    copper: 0.7,       // average of 5-10%
    lead: 0,         // no lead in alkaline batteries
    plastic: 0.90      // remainder in plastic casing and separator
  }
}

];
export default devices;