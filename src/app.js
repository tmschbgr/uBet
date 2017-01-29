// module
var app = angular.module('app', ['ngMaterial']);

// config
app.config(['$mdThemingProvider',
    function ($mdThemingProvider) {

        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('deep-orange')
    }
]);

// Controller
app.controller('appCtrl', ['$scope', function ($scope) {

    $scope.offers = [
        {requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Buy'},
        {requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Buy'},
        {requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Sell'},
        {requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Sell'},
    ];

    $scope.accepts = [
        {requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Buy', quote: 1.490},
        {requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Buy', quote: 1.442},
        {requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Sell', quote: 1.456},
        { requester: '0xc5d4e818b6471d9af355c22a215618408f5240b1', transactionType: 'Sell', quote: 1.420 },
    ];

    var abi =
        [{ "constant": true, "inputs": [], "name": "status", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "accept", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "sender", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_quote", "type": "uint256" }], "name": "offer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getEntitlement", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "transactionType", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "quote", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "amount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getRequest", "outputs": [{ "name": "s", "type": "address" }, { "name": "r", "type": "address" }, { "name": "tt", "type": "bool" }, { "name": "a", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_transactionType", "type": "bool" }, { "name": "_amount", "type": "uint256" }], "name": "request", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "receiver", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }];

    var dappId = "com.tr.ubet";

    var contractAddress = "0x516b3caea66d3baa25592fddb230dab1ac34d4ba";

    var walletBar = new WalletBar({
        dappNamespace: dappId,
        blockchain: "norsborg",
        callbacks: { signOut: function () { location.reload(); } }
    });

    var web3 = new Web3();
    var myContract;
    walletBar.applyHook(web3)
        .then(function () {
            document.getElementById("app").style.display = "";
            myContract = web3.eth.contract(abi).at(contractAddress);

            setInterval(function () {
                console.log("Intervall")
                myContract.amount(function (e, c) {
                    console.log("amount", e,c)
                    if (!e) $scope.amount = c;
                });
                myContract.transactionType(function (e, c) {
                    if (!e) $scope.transactionType = c;
                });
                myContract.sender(function (e, c) {
                    if (!e) $scope.sender = c;
                });
                myContract.receiver(function (e, c) {
                    if (!e) $scope.receiver = c;
                });
                myContract.status(function (e, c) {
                    if (!e) $scope.status = c;
                });
                myContract.quote(function (e, c) {
                    if (!e) $scope.quote = c;
                });
            }, 1000);
        })
        .catch(function (err) {
            console.log(err);
        });

    $scope.request = function (type, amount) {
        var account = walletBar.getCurrentAccount(); // get account selected in wallet bar
        if (!account) return alert("You must log in to transact");
        walletBar.createSecureSigner();
        myContract.request.estimateGas(type, amount, { from: account }, function (err1, gas) {
            if (err1) return alert("Error: " + err1);
            myContract.request.sendTransaction(type, amount, { gas: gas, from: account }, function (err2, hash) {
                if (err2) return alert("Error: " + err2);
                //document.getElementById("status").innerText = "Last vote Tx ID: "+hash;
            });
        });
    }

    $scope.offer = function (quote) {
        var account = walletBar.getCurrentAccount(); // get account selected in wallet bar
        if (!account) return alert("You must log in to transact");
        walletBar.createSecureSigner();
        myContract.offer.estimateGas(quote, { from: account }, function (err1, gas) {
            if (err1) return alert("Error: " + err1);
            myContract.offer.sendTransaction(quote, { gas: gas, from: account }, function (err2, hash) {
                if (err2) return alert("Error: " + err2);
                //document.getElementById("status").innerText = "Last vote Tx ID: "+hash;
            });
        });
    }

    $scope.accept = function () {
        var account = walletBar.getCurrentAccount(); // get account selected in wallet bar
        if (!account) return alert("You must log in to transact");
        walletBar.createSecureSigner();
        myContract.accept.estimateGas({ from: account }, function (err1, gas) {
            if (err1) return alert("Error: " + err1);
            myContract.accept.sendTransaction({ gas: gas, from: account }, function (err2, hash) {
                if (err2) return alert("Error: " + err2);
                //document.getElementById("status").innerText = "Last vote Tx ID: "+hash;
            });
        });
    }


    $scope.calcMargin = function () {
        var account = walletBar.getCurrentAccount(); // get account selected in wallet bar
        if (!account) return alert("You must log in to transact");
        walletBar.createSecureSigner();
        myContract.calcMu.estimateGas({ from: account }, function (err1, gas) {
            if (err1) return alert("Error: " + err1);
            myContract.calcMu.sendTransaction({ gas: gas, from: account }, function (err2, hash) {
                if (err2) return alert("Error: " + err2);
                //document.getElementById("status").innerText = "Last vote Tx ID: "+hash;
            });
        });
    }

    $scope.doSettlement = function () {
        var account = walletBar.getCurrentAccount(); // get account selected in wallet bar
        if (!account) return alert("You must log in to transact");
        walletBar.createSecureSigner();
        myContract.doSettlement.estimateGas({ from: account }, function (err1, gas) {
            if (err1) return alert("Error: " + err1);
            myContract.doSettlement.sendTransaction({ gas: gas, from: account }, function (err2, hash) {
                if (err2) return alert("Error: " + err2);
                //document.getElementById("status").innerText = "Last vote Tx ID: "+hash;
            });
        });
    }


}]);
