new Vue({
    el: '#app',
    mounted() {
      this.getCurrencies()
    },
    data: {
      currencies: {},
      from: 'USD',
      to: 'PKR',
      amount: null,
      result: 0
    }, 
    computed: {
      formattedCurrencies() {
        return Object.values(this.currencies)
      },
      calculatedResult(){
          return (Number(this.amount) * this.result).toFixed(3);
      }
    },
    methods: {
      getCurrencies() {
        const currencies = localStorage.getItem('currencies')
  
        if (currencies) {
          this.currencies = JSON.parse(currencies)
  
          return
        }
        axios.get('https://free.currencyconverterapi.com/api/v6/currencies')
          .then((response) => {
            const { results } = response.data
            localStorage.setItem('currencies', JSON.stringify(results))
            this.currencies = results
          })
      },
      convertCurrency() {
          const key = `${this.from}_${this.to}`;
        axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${key}`)
          .then((response) => {
            console.log(response)
            this.result = response.data.results[key].val
          })
      }
    }
  })