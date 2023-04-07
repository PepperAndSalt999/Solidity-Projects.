import { Form } from "react-router-dom";
import React from 'react';
import { useEffect } from "react";
import { ethers } from "ethers";

function Bank() {
    const [Accounts, setAccounts] = React.useState([]);
    const [Deposit, setDeposit] = React.useState([]);
    const [Withdraw, setWithdraw] = React.useState([]);
    let test;
    let signer;
    async function eth_config()
    {
        let provider;
        if(window.ethereum != null)
        {
            provider = new ethers.providers.Web3Provider(window.ethereum, 'goerli');
            await provider.send("eth_requestAccounts", []).then(()=>console.log("success"));


            signer = provider.getSigner();
            // const Address = "0x62B93Af59b6dd942ED84AbDA466e4310c074D622";
            const Abi = [
                "event withdraw_event(address indexed _from, uint _value, bytes32 request_id)",
                "event Deposit(address indexed _from, uint _value)",
                "function create_Account (address[] calldata owners)"
            ];
            test = await new ethers.Contract(Address, Abi, provider);

            test.on("Deposit", ( _from, _value , event) => {
                console.log(_from, _value);
            });
            test.on("withdraw_event", (_from, _value, request_id, event) => {
            console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`);
            // setWithdraw([_from, _value, _id]);
            });
        }
        else
            provider = ethers.providers.getDefaultProvider();
    }
    async function metamask_request()
    {
        const account = await ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function onSubmit(e){
        e.preventDefault();
        const owners = e.target.Account.value;
        // Check if user is connected to Metamask
        if (window.ethereum)
        {
            test.create_Account(owners)
                .then((tx) => {
                    console.log(tx);
                    Accounts = [...Accounts, owners];
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }



    useEffect(()=>{
        eth_config();
    }, []);

    useEffect(()=>{
        document.getElementById("output").innerHTML = Accounts;
    }, [Accounts]);

    useEffect(()=>{
        document.getElementById("withdraw").innerHTML = Withdraw;
    }, [Withdraw]);
    
    return(
        <>
            <Form onSubmit={onSubmit}>
                <label htmlFor="Account" >Account Name</label>
                <input name="Account" type="text"  />
                <button>submit</button>
            </Form>
            <div id="output">
            </div>
            <div id="withdraw"></div>
        </>
    );
};

export default Bank;