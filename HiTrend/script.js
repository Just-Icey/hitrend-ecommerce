// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ===== BIDIRECTIONAL CURRENCY CONVERTER =====
if (document.querySelector('.currency-widget-wrapper')) {
    
    let exchangeRates = {};
    let isFetching = false;
    let direction = 'toGHS'; // 'toGHS' or 'fromGHS'

    // Currency names for display
    const currencyNames = {
        USD: 'US Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
        AED: 'UAE Dirham',
        AFN: 'Afghan Afghani',
        ALL: 'Albanian Lek',
        AMD: 'Armenian Dram',
        AOA: 'Angolan Kwanza',
        ARS: 'Argentine Peso',
        AUD: 'Australian Dollar',
        AWG: 'Aruban Florin',
        AZN: 'Azerbaijani Manat',
        BAM: 'Bosnia Convertible Mark',
        BBD: 'Barbadian Dollar',
        BDT: 'Bangladeshi Taka',
        BGN: 'Bulgarian Lev',
        BHD: 'Bahraini Dinar',
        BIF: 'Burundian Franc',
        BMD: 'Bermudian Dollar',
        BND: 'Brunei Dollar',
        BOB: 'Bolivian Boliviano',
        BRL: 'Brazilian Real',
        BSD: 'Bahamian Dollar',
        BTN: 'Bhutanese Ngultrum',
        BWP: 'Botswana Pula',
        BYN: 'Belarusian Ruble',
        BZD: 'Belize Dollar',
        CAD: 'Canadian Dollar',
        CDF: 'Congolese Franc',
        CHF: 'Swiss Franc',
        CLP: 'Chilean Peso',
        CNY: 'Chinese Yuan',
        COP: 'Colombian Peso',
        CRC: 'Costa Rican Colon',
        CVE: 'Cape Verdean Escudo',
        CZK: 'Czech Koruna',
        DJF: 'Djiboutian Franc',
        DKK: 'Danish Krone',
        DOP: 'Dominican Peso',
        DZD: 'Algerian Dinar',
        EGP: 'Egyptian Pound',
        ERN: 'Eritrean Nakfa',
        ETB: 'Ethiopian Birr',
        FJD: 'Fijian Dollar',
        FKP: 'Falkland Islands Pound',
        GEL: 'Georgian Lari',
        GGP: 'Guernsey Pound',
        GHS: 'Ghana Cedi',
        GIP: 'Gibraltar Pound',
        GMD: 'Gambian Dalasi',
        GNF: 'Guinean Franc',
        GTQ: 'Guatemalan Quetzal',
        GYD: 'Guyanese Dollar',
        HKD: 'Hong Kong Dollar',
        HNL: 'Honduran Lempira',
        HTG: 'Haitian Gourde',
        HUF: 'Hungarian Forint',
        IDR: 'Indonesian Rupiah',
        ILS: 'Israeli Shekel',
        IMP: 'Isle of Man Pound',
        INR: 'Indian Rupee',
        IQD: 'Iraqi Dinar',
        IRR: 'Iranian Rial',
        ISK: 'Icelandic Krona',
        JEP: 'Jersey Pound',
        JMD: 'Jamaican Dollar',
        JOD: 'Jordanian Dinar',
        JPY: 'Japanese Yen',
        KES: 'Kenyan Shilling',
        KGS: 'Kyrgyzstani Som',
        KHR: 'Cambodian Riel',
        KMF: 'Comorian Franc',
        KPW: 'North Korean Won',
        KRW: 'South Korean Won',
        KWD: 'Kuwaiti Dinar',
        KYD: 'Cayman Islands Dollar',
        KZT: 'Kazakhstani Tenge',
        LAK: 'Lao Kip',
        LBP: 'Lebanese Pound',
        LKR: 'Sri Lankan Rupee',
        LRD: 'Liberian Dollar',
        LSL: 'Lesotho Loti',
        LYD: 'Libyan Dinar',
        MAD: 'Moroccan Dirham',
        MDL: 'Moldovan Leu',
        MGA: 'Malagasy Ariary',
        MKD: 'Macedonian Denar',
        MMK: 'Burmese Kyat',
        MNT: 'Mongolian Togrog',
        MOP: 'Macanese Pataca',
        MRU: 'Mauritanian Ouguiya',
        MUR: 'Mauritius Rupee',
        MWK: 'Malawian Kwacha',
        MXN: 'Mexican Peso',
        MYR: 'Malaysian Ringgit',
        MZN: 'Mozambican Metical',
        NAD: 'Namibian Dollar',
        NGN: 'Nigerian Naira',
        NIO: 'Nicaraguan Cordoba',
        NOK: 'Norwegian Krone',
        NPR: 'Nepalese Rupee',
        NZD: 'New Zealand Dollar',
        OMR: 'Rial Omani',
        PAB: 'Panamanian Balboa',
        PEN: 'Peruvian Sol',
        PGK: 'Papua New Guinean Kina',
        PHP: 'Philippine Peso',
        PKR: 'Pakistani Rupee',
        PLN: 'Polish Zloty',
        PYG: 'Paraguayan Guarani',
        QAR: 'Qatari Rial',
        RON: 'Romanian Leu',
        RSD: 'Serbian Dinar',
        RUB: 'Russian Ruble',
        RWF: 'Rwandan Franc',
        SAR: 'Saudi Riyal',
        SBD: 'Solomon Islands Dollar',
        SCR: 'Seychellois Rupee',
        SDG: 'Sudanese Pound',
        SEK: 'Swedish Krona',
        SGD: 'Singapore Dollar',
        SHP: 'Saint Helena Pound',
        SLL: 'Sierra Leonean Leone',
        SOS: 'Somali Shilling',
        SRD: 'Surinamese Dollar',
        SYP: 'Syrian Pound',
        SZL: 'Eswatini Lilangeni',
        THB: 'Thai Baht',
        TJS: 'Tajikistani Somoni',
        TMT: 'Turkmenistan Manat',
        TND: 'Tunisian Dinar',
        TOP: 'Tongan Pa\'anga',
        TRY: 'Turkish Lira',
        TTD: 'Trinidad and Tobago Dollar',
        TWD: 'New Taiwan Dollar',
        TZS: 'Tanzanian Shilling',
        UAH: 'Ukrainian Hryvnia',
        UGX: 'Ugandan Shilling',
        UYU: 'Uruguayan Peso',
        UZS: 'Uzbekistani Som',
        VES: 'Venezuelan Bolivar',
        VND: 'Vietnamese Dong',
        VUV: 'Vanuatu Vatu',
        WST: 'Samoan Tala',
        XAF: 'Central African CFA Franc',
        XCD: 'East Caribbean Dollar',
        XOF: 'West African CFA Franc',
        XPF: 'CFP Franc',
        YER: 'Yemeni Rial',
        ZAR: 'South African Rand',
        ZMW: 'Zambian Kwacha'
    };

    const currencyFlags = {
        USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', AED: '🇦🇪', AFN: '🇦🇫',
        ALL: '🇦🇱', AMD: '🇦🇲', AOA: '🇦🇴', ARS: '🇦🇷', AUD: '🇦🇺',
        AWG: '🇦🇼', AZN: '🇦🇿', BAM: '🇧🇦', BBD: '🇧🇧', BDT: '🇧🇩',
        BGN: '🇧🇬', BHD: '🇧🇭', BIF: '🇧🇮', BMD: '🇧🇲', BND: '🇧🇳',
        BOB: '🇧🇴', BRL: '🇧🇷', BSD: '🇧🇸', BTN: '🇧🇹', BWP: '🇧🇼',
        BYN: '🇧🇾', BZD: '🇧🇿', CAD: '🇨🇦', CDF: '🇨🇩', CHF: '🇨🇭',
        CLP: '🇨🇱', CNY: '🇨🇳', COP: '🇨🇴', CRC: '🇨🇷', CVE: '🇨🇻',
        CZK: '🇨🇿', DJF: '🇩🇯', DKK: '🇩🇰', DOP: '🇩🇴', DZD: '🇩🇿',
        EGP: '🇪🇬', ERN: '🇪🇷', ETB: '🇪🇹', FJD: '🇫🇯', FKP: '🇫🇰',
        GEL: '🇬🇪', GGP: '🇬🇬', GHS: '🇬🇭', GIP: '🇬🇮', GMD: '🇬🇲',
        GNF: '🇬🇳', GTQ: '🇬🇹', GYD: '🇬🇾', HKD: '🇭🇰', HNL: '🇭🇳',
        HTG: '🇭🇹', HUF: '🇭🇺', IDR: '🇮🇩', ILS: '🇮🇱', IMP: '🇮🇲',
        INR: '🇮🇳', IQD: '🇮🇶', IRR: '🇮🇷', ISK: '🇮🇸', JEP: '🇯🇪',
        JMD: '🇯🇲', JOD: '🇯🇴', JPY: '🇯🇵', KES: '🇰🇪', KGS: '🇰🇬',
        KHR: '🇰🇭', KMF: '🇰🇲', KPW: '🇰🇵', KRW: '🇰🇷', KWD: '🇰🇼',
        KYD: '🇰🇾', KZT: '🇰🇿', LAK: '🇱🇦', LBP: '🇱🇧', LKR: '🇱🇰',
        LRD: '🇱🇷', LSL: '🇱🇸', LYD: '🇱🇾', MAD: '🇲🇦', MDL: '🇲🇩',
        MGA: '🇲🇬', MKD: '🇲🇰', MMK: '🇲🇲', MNT: '🇲🇳', MOP: '🇲🇴',
        MRU: '🇲🇷', MUR: '🇲🇺', MWK: '🇲🇼', MXN: '🇲🇽', MYR: '🇲🇾',
        MZN: '🇲🇿', NAD: '🇳🇦', NGN: '🇳🇬', NIO: '🇳🇮', NOK: '🇳🇴',
        NPR: '🇳🇵', NZD: '🇳🇿', OMR: '🇴🇲', PAB: '🇵🇦', PEN: '🇵🇪',
        PGK: '🇵🇬', PHP: '🇵🇭', PKR: '🇵🇰', PLN: '🇵🇱', PYG: '🇵🇾',
        QAR: '🇶🇦', RON: '🇷🇴', RSD: '🇷🇸', RUB: '🇷🇺', RWF: '🇷🇼',
        SAR: '🇸🇦', SBD: '🇸🇧', SCR: '🇸🇨', SDG: '🇸🇩', SEK: '🇸🇪',
        SGD: '🇸🇬', SHP: '🇸🇭', SLL: '🇸🇱', SOS: '🇸🇴', SRD: '🇸🇷',
        SYP: '🇸🇾', SZL: '🇸🇿', THB: '🇹🇭', TJS: '🇹🇯', TMT: '🇹🇲',
        TND: '🇹🇳', TOP: '🇹🇴', TRY: '🇹🇷', TTD: '🇹🇹', TWD: '🇹🇼',
        TZS: '🇹🇿', UAH: '🇺🇦', UGX: '🇺🇬', UYU: '🇺🇾', UZS: '🇺🇿',
        VES: '🇻🇪', VND: '🇻🇳', VUV: '🇻🇺', WST: '🇼🇸', XAF: '🇨🇲',
        XCD: '🇦🇬', XOF: '🇧🇯', XPF: '🇵🇫', YER: '🇾🇪', ZAR: '🇿🇦',
        ZMW: '🇿🇲'
    };

    // Function to fetch all exchange rates
    async function fetchExchangeRates() {
        const convertBtn = document.getElementById('convertBtn');
        
        if (isFetching) return;
        isFetching = true;

        if (convertBtn) {
            convertBtn.textContent = 'Loading...';
            convertBtn.disabled = true;
        }

        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            exchangeRates = data.rates;
            
            // Update last updated time
            const lastUpdated = document.getElementById('lastUpdated');
            if (lastUpdated) {
                const now = new Date();
                lastUpdated.textContent = `Last updated: ${now.toLocaleTimeString()}`;
            }
            
            return true;
            
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            // Fallback rates if API fails
            exchangeRates = {
                USD: 1, EUR: 0.92, GBP: 0.78, AED: 3.67, AFN: 89.5,
                ALL: 95.2, AMD: 387.5, AOA: 850, ARS: 1200, AUD: 1.5,
                AWG: 1.8, AZN: 1.7, BAM: 1.76, BBD: 2.0, BDT: 117.5,
                BGN: 1.76, BHD: 0.376, BIF: 2850, BMD: 1.0, BND: 1.35,
                BOB: 6.91, BRL: 5.2, BSD: 1.0, BTN: 84.5, BWP: 13.8,
                BYN: 2.9, BZD: 2.02, CAD: 1.35, CDF: 2800, CHF: 0.92,
                CLP: 950, CNY: 7.2, COP: 4200, CRC: 540, CVE: 99.2,
                CZK: 23.5, DJF: 178, DKK: 6.75, DOP: 59.5, DZD: 135,
                EGP: 48.5, ERN: 15.0, ETB: 115, FJD: 2.25, FKP: 0.78,
                GEL: 2.65, GGP: 0.78, GHS: 15.5, GIP: 0.78, GMD: 70,
                GNF: 8600, GTQ: 7.75, GYD: 209, HKD: 7.8, HNL: 24.8,
                HTG: 132, HUF: 365, IDR: 15500, ILS: 3.75, IMP: 0.78,
                INR: 84.5, IQD: 1310, IRR: 42000, ISK: 138, JEP: 0.78,
                JMD: 157, JOD: 0.709, JPY: 145, KES: 130, KGS: 89.5,
                KHR: 4100, KMF: 442, KPW: 900, KRW: 1380, KWD: 0.307,
                KYD: 0.833, KZT: 480, LAK: 22000, LBP: 89500, LKR: 300,
                LRD: 195, LSL: 18.5, LYD: 4.85, MAD: 10.0, MDL: 17.8,
                MGA: 4500, MKD: 55.5, MMK: 2100, MNT: 3450, MOP: 8.05,
                MRU: 40.0, MUR: 46.5, MWK: 1740, MXN: 18.5, MYR: 4.45,
                MZN: 64.0, NAD: 18.5, NGN: 1500, NIO: 36.8, NOK: 10.5,
                NPR: 134, NZD: 1.65, OMR: 0.385, PAB: 1.0, PEN: 3.75,
                PGK: 3.85, PHP: 58.5, PKR: 278, PLN: 4.0, PYG: 7800,
                QAR: 3.64, RON: 4.6, RSD: 107, RUB: 92, RWF: 1350,
                SAR: 3.75, SBD: 8.4, SCR: 13.5, SDG: 600, SEK: 10.5,
                SGD: 1.33, SHP: 0.78, SLL: 21000, SOS: 570, SRD: 34.5,
                SYP: 2500, SZL: 18.5, THB: 35.5, TJS: 10.5, TMT: 3.5,
                TND: 3.1, TOP: 2.35, TRY: 34, TTD: 6.8, TWD: 32.5,
                TZS: 2700, UAH: 41, UGX: 3700, UYU: 42, UZS: 12700,
                VES: 36.5, VND: 25400, VUV: 119, WST: 2.75, XAF: 590,
                XCD: 2.7, XOF: 590, XPF: 107, YER: 250, ZAR: 18.5,
                ZMW: 26.5
            };
            return false;
            
        } finally {
            isFetching = false;
            if (convertBtn) {
                convertBtn.textContent = 'Convert →';
                convertBtn.disabled = false;
            }
        }
    }

    // Toggle conversion direction
    function toggleDirection() {
        const directionBtn = document.getElementById('directionBtn');
        const directionLabel = document.getElementById('directionLabel');
        const currencySelect = document.getElementById('currencySelect');
        const resultDisplay = document.getElementById('conversionResult');
        
        if (direction === 'toGHS') {
            direction = 'fromGHS';
            directionLabel.textContent = `GHS → ${currencySelect.options[currencySelect.selectedIndex]?.text.split('-')[0].trim() || 'Currency'}`;
            directionBtn.style.background = '#f59e0b';
            // Clear previous result
            if (resultDisplay) {
                resultDisplay.innerHTML = '';
                resultDisplay.style.color = '#1e1e1e';
            }
        } else {
            direction = 'toGHS';
            directionLabel.textContent = `GHS → ${currencySelect.options[currencySelect.selectedIndex]?.text.split('-')[0].trim() || 'Currency'}`;
            directionBtn.style.background = '#6c5ce7';
            if (resultDisplay) {
                resultDisplay.innerHTML = '';
                resultDisplay.style.color = '#1e1e1e';
            }
        }
        
        // Auto-convert if there's an amount
        const amountInput = document.getElementById('amountInput');
        if (amountInput && amountInput.value && parseFloat(amountInput.value) > 0) {
            convertCurrency();
        }
    }

    // Function to convert currency (bidirectional)
    function convertCurrency() {
        const amountInput = document.getElementById('amountInput');
        const currencySelect = document.getElementById('currencySelect');
        const resultDisplay = document.getElementById('conversionResult');
        
        if (!amountInput || !currencySelect || !resultDisplay) return;
        
        const amount = parseFloat(amountInput.value);
        const selectedCurrency = currencySelect.value;

        // Validation
        if (isNaN(amount) || amount <= 0) {
            resultDisplay.innerHTML = '⚠️ Please enter a valid amount';
            resultDisplay.style.color = '#856404';
            return;
        }

        // Check if we have rates
        if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
            resultDisplay.innerHTML = '⏳ Exchange rates loading. Please try again.';
            resultDisplay.style.color = '#dc3545';
            return;
        }

        // Check if the currency exists
        if (!exchangeRates[selectedCurrency]) {
            resultDisplay.innerHTML = '⚠️ Currency not supported. Please select another.';
            resultDisplay.style.color = '#dc3545';
            return;
        }

        let resultAmount, fromSymbol, fromName, toSymbol, toName;
        const ghsRate = exchangeRates.GHS || 15.5;
        const currencyRate = exchangeRates[selectedCurrency];

        if (direction === 'toGHS') {
            // Convert FROM selected currency TO GHS
            // Amount in USD = amount / currencyRate (since rates are based on USD)
            const amountInUSD = amount / currencyRate;
            resultAmount = amountInUSD * ghsRate;
            
            fromSymbol = currencyFlags[selectedCurrency] || '';
            fromName = currencyNames[selectedCurrency] || selectedCurrency;
            toSymbol = '🇬🇭';
            toName = 'GHS';
            
            resultDisplay.innerHTML = `
                <strong style="font-size: 20px; color: #1e1e1e;">
                    ${fromSymbol} ${amount.toFixed(2)} ${fromName} = ${toSymbol} ${resultAmount.toFixed(2)} ${toName}
                </strong>
                <br />
                <span style="font-size: 13px; color: #666;">
                    1 ${selectedCurrency} = ${(ghsRate / currencyRate).toFixed(2)} GHS
                </span>
            `;
        } else {
            // Convert FROM GHS TO selected currency
            // Amount in USD = amount / ghsRate
            const amountInUSD = amount / ghsRate;
            resultAmount = amountInUSD * currencyRate;
            
            fromSymbol = '🇬🇭';
            fromName = 'GHS';
            toSymbol = currencyFlags[selectedCurrency] || '';
            toName = currencyNames[selectedCurrency] || selectedCurrency;
            
            resultDisplay.innerHTML = `
                <strong style="font-size: 20px; color: #1e1e1e;">
                    ${fromSymbol} ${amount.toFixed(2)} ${fromName} = ${toSymbol} ${resultAmount.toFixed(2)} ${toName}
                </strong>
                <br />
                <span style="font-size: 13px; color: #666;">
                    1 GHS = ${(currencyRate / ghsRate).toFixed(4)} ${selectedCurrency}
                </span>
            `;
        }
        
        resultDisplay.style.color = '#22c55e';
    }

    // Update direction label when currency changes
    function updateDirectionLabel() {
        const currencySelect = document.getElementById('currencySelect');
        const directionLabel = document.getElementById('directionLabel');
        
        if (currencySelect && directionLabel) {
            const currencyText = currencySelect.options[currencySelect.selectedIndex]?.text || 'Currency';
            const currencyCode = currencySelect.value;
            if (direction === 'toGHS') {
                directionLabel.textContent = `${currencyCode} → GHS`;
            } else {
                directionLabel.textContent = `GHS → ${currencyCode}`;
            }
        }
    }

    // Initialize converter when DOM is ready
    document.addEventListener('DOMContentLoaded', async function() {
        // Fetch exchange rates
        await fetchExchangeRates();

        // Set up convert button
        const convertBtn = document.getElementById('convertBtn');
        if (convertBtn) {
            convertBtn.addEventListener('click', convertCurrency);
        }

        // Set up direction toggle
        const directionBtn = document.getElementById('directionBtn');
        if (directionBtn) {
            directionBtn.addEventListener('click', toggleDirection);
        }

        // Auto-convert on Enter key
        const amountInput = document.getElementById('amountInput');
        if (amountInput) {
            amountInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    convertCurrency();
                }
            });
        }

        // Update display when currency changes
        const currencySelect = document.getElementById('currencySelect');
        if (currencySelect) {
            currencySelect.addEventListener('change', function() {
                updateDirectionLabel();
                // Auto-convert if there's an amount
                if (amountInput && amountInput.value && parseFloat(amountInput.value) > 0) {
                    convertCurrency();
                }
            });
        }

        // Auto-convert on amount change (debounced)
        if (amountInput) {
            let timeoutId;
            amountInput.addEventListener('input', function() {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    if (this.value && parseFloat(this.value) > 0) {
                        convertCurrency();
                    }
                }, 500);
            });
        }

        // Initial label update
        updateDirectionLabel();
    });
}