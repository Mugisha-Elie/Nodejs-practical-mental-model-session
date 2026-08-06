import express from 'express'
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const ConversionRates: Record<string, number> = {
  usd: 1300,
  eur: 1420,
  gbp: 1650
}

app.get('/convert', (req: Request, res: Response): void => {
  const { amount, currency } = req.query;

  if (!amount || !currency) {
    res.status(400).json({
      success: false,
      error: {
        message: 'amount and currency are required query parameters!'
      }
    })
    return;
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    res.status(400).json({
      success: false,
      error: {
        message: 'The amount provided must be a valid positive number'
      }
    })
    return;
  }


  const currencyStr = currency.toString().toLowerCase();
  const rate = ConversionRates[currencyStr];

  if (!rate) {
    res.status(400).json({
      success: false,
      error: {
        message: 'Accepted currency are: usd, eur, gbp. The currency you provided is unsupported'
      }
    })

    return;
  }

  const convertedAmount = numericAmount * rate;

  res.status(200).json({
    success: true,
    data: {
      input: { amount: numericAmount, currency: currencyStr },
      convertedAmount,
      unit: "RWF"
    }
  })
})


app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))