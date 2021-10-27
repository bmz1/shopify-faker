import faker from 'faker'
import { writeFileSync } from 'fs'
import { Parser } from 'json2csv'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function main() {
  const products = []
  Array.from({ length: process.env.FAKE_COUNT || 100 }).forEach(() => {
    products.push(generateFakeProduct())
  })

  console.log(`Generated ${products.length} products`)
  const fields = Object.keys(products[0])
  const parser = new Parser({ fields, quote: '' })
  const csv = parser.parse(products)
  writeFileSync(join(__dirname, '..', `fake_products.csv`), csv)
  console.log('Done')
}

function generateFakeProduct() {
  const productName = faker.commerce.productName().replace(',', '')
  const variantPrice = faker.commerce.price()

  return {
    Handle: productName,
    Title: productName,
    'Body (HTML)': 'Sample description',
    Vendor: faker.company.companyName().replace(',', ''),
    Tags: `${faker.commerce.productAdjective()} ${faker.commerce.productAdjective()} ${faker.commerce.productAdjective()}`,
    Published: true,
    'Option1 Name': '',
    'Option1 Value': '',
    'Option2 Name': '',
    'Option2 Value': '',
    'Option3 Name': '',
    'Option3 Value': '',
    'Variant SKU': faker.commerce.color(),
    'Variant Grams': faker.datatype.number(),
    'Variant Inventory Tracker': '',
    'Variant Inventory Qty': faker.datatype.number(),
    'Variant Inventory Policy': 'deny',
    'Variant Fulfillment Service': 'manual',
    'Variant Price': variantPrice,
    'Variant Compare At Price': variantPrice,
    'Variant Requires Shipping': true,
    'Variant Taxable': true,
    'Variant Barcode': '',
    'Image Src': faker.image.imageUrl(),
    'Image Position': 1,
    'Image Alt Text': productName,
    'Gift Card': false,
    'SEO Title': productName,
    'SEO Description': faker.lorem.sentence().replace(',', ''),
    'Google Shopping / Google Product Category': '',
    'Google Shopping / Gender': '',
    'Google Shopping / MPN': '',
    'Google Shopping / AdWords Grouping': '',
    'Google Shopping / AdWords Labels': '',
    'Google Shopping / Condition': '',
    'Google Shopping / Custome Label 0': '',
    'Google Shopping / Custom Label 1': '',
    'Google Shopping / Custom Label 2': '',
    'Google Shopping / Custom Label 3': '',
    'Google Shopping / Custom Label 4': '',
    'Variant Image': '',
    'Variant Weight Unit': 'g',
    'Variant Tax Code': '',
    'Cost per item': variantPrice,
    Status: 'active',
    'Standard Product Type': '',
    'Custom Product Type': productName,
  }
}

main()
