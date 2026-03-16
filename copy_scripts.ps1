$source = "backend/scripts_raw_all"
$dest = "backend/scripts_raw"

# Prepare target folders
New-Item -ItemType Directory -Path "$dest/find_stocks", "$dest/technical_indicators", "$dest/portfolio_strategies", "$dest/stock_analysis", "$dest/machine_learning" -Force | Out-Null

# Find Stocks
Copy-Item "$source/find_stocks/rsi_screener.py" "$dest/find_stocks/" -ErrorAction SilentlyContinue
Copy-Item "$source/find_stocks/volume_breakout.py" "$dest/find_stocks/" -ErrorAction SilentlyContinue
Copy-Item "$source/find_stocks/earnings_surprise.py" "$dest/find_stocks/" -ErrorAction SilentlyContinue
Copy-Item "$source/find_stocks/high_52week.py" "$dest/find_stocks/" -ErrorAction SilentlyContinue
Copy-Item "$source/find_stocks/momentum_screener.py" "$dest/find_stocks/" -ErrorAction SilentlyContinue

# Technical Indicators
Copy-Item "$source/technical_indicators/rsi_chart.py" "$dest/technical_indicators/" -ErrorAction SilentlyContinue
Copy-Item "$source/technical_indicators/macd_chart.py" "$dest/technical_indicators/" -ErrorAction SilentlyContinue
Copy-Item "$source/technical_indicators/bollinger_bands.py" "$dest/technical_indicators/" -ErrorAction SilentlyContinue
Copy-Item "$source/technical_indicators/obv_chart.py" "$dest/technical_indicators/" -ErrorAction SilentlyContinue

# Portfolio Strategies
Copy-Item "$source/portfolio_strategies/macd_strategy.py" "$dest/portfolio_strategies/" -ErrorAction SilentlyContinue
Copy-Item "$source/portfolio_strategies/mean_reversion.py" "$dest/portfolio_strategies/" -ErrorAction SilentlyContinue
Copy-Item "$source/portfolio_strategies/momentum_strategy.py" "$dest/portfolio_strategies/" -ErrorAction SilentlyContinue
Copy-Item "$source/portfolio_strategies/sector_rotation.py" "$dest/portfolio_strategies/" -ErrorAction SilentlyContinue
Copy-Item "$source/portfolio_strategies/monte_carlo.py" "$dest/portfolio_strategies/" -ErrorAction SilentlyContinue
Copy-Item "$source/portfolio_strategies/efficient_frontier.py" "$dest/portfolio_strategies/" -ErrorAction SilentlyContinue
Copy-Item "$source/portfolio_strategies/portfolio_optimisation.py" "$dest/portfolio_strategies/" -ErrorAction SilentlyContinue

# Stock Analysis
Copy-Item "$source/stock_analysis/beta_calculator.py" "$dest/stock_analysis/" -ErrorAction SilentlyContinue
Copy-Item "$source/stock_analysis/correlation_matrix.py" "$dest/stock_analysis/" -ErrorAction SilentlyContinue
Copy-Item "$source/stock_analysis/dcf_calculator.py" "$dest/stock_analysis/" -ErrorAction SilentlyContinue
Copy-Item "$source/stock_analysis/pe_ratio.py" "$dest/stock_analysis/" -ErrorAction SilentlyContinue

# Machine Learning
Copy-Item "$source/machine_learning/stock_classifier.py" "$dest/machine_learning/" -ErrorAction SilentlyContinue
Copy-Item "$source/machine_learning/sector_clustering.py" "$dest/machine_learning/" -ErrorAction SilentlyContinue

Write-Host "Copy Finished!"
