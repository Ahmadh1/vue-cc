new Vue({
    el: '#app',
    mounted() {
      this.getCurrencies()
    },
    data: {
      currencies: {},
      from: 'USD',
      to: 'PKR',
      amount: 0,
      result: 0,
      loading: false
    }, 
    computed: {
      formattedCurrencies() {
        return Object.values(this.currencies)
      },
      calculatedResult(){
          return (Number(this.amount) * this.result).toFixed(3);
      },
      disabled() {
        return this.amount === 0 || !this.amount || this.loading;
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
          this.loading = true;
        axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${key}`)
          .then((response) => {
            this.loading = false;
            this.result = response.data.results[key].val
          })
      }
    },
   
    watch: {

      from() {
        return this.result = 0;
      },

      to() {
        return this.result = 0;
      }
    
    }
  })