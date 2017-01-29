var query = oraclize_query("URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result");
			
function __callback(bytes32 myid, string result) {
  if (msg.sender != oraclize_cbAddress()) throw;
    log(bytes32ToString(query));
    log(bytes32ToString(myid));
    log(result);
    document.write(result);
  }
}
