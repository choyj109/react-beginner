import { number } from "prop-types";
import { useState, useEffect } from "react";

function CoinChallenge() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  // challenge ~
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState(0);
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };
  const reset = () => setAmount(0);
  // ~ challenge
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading</strong>
      ) : (
        // challenge ~
        <div>
          <select onChange={handleSelect} value={selected}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price} key={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
          <div>
            <label>
              <input
                onChange={onChange}
                value={amount}
                type="number"
                placeholder="Write Price"
              />
              Price:
              {amount === ""
                ? "write number"
                : parseInt(amount) / parseInt(selected)}
            </label>
            <div>
              <button onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
        // ~ challenge
      )}
    </div>
  );
}

export default CoinChallenge;
