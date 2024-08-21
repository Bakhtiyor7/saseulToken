const SASEUL = require("saseul");

async function nftIssue(
  space: string,
  name: string,
  symbol: string,
  peer: string,
  address: string,
  privateKey: string
) {
  SASEUL.Rpc.endpoint(peer);

  let cid = SASEUL.Enc.cid(address, space);
  let result;
  try {
    result = await SASEUL.Rpc.broadcastTransaction(
      SASEUL.Rpc.signedTransaction(
        {
          cid: cid,
          type: "Issue",
          name: name,
          symbol: symbol,
        },
        privateKey
      )
    );
    return {
      ...result,
      cid: cid,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      error: error.msg,
    };
  }
}

const space = "hansNftTest";
const tokenName = "leoToken2";
const symbol = "lt";
const peer = "43.225.140.61";
const address = "cd32734211d10abaab69d2d7cee927b09b15b5bbb52b";
const privateKey =
  "eef6ecd35a4c70520ffaecf2b3d84e2160c5389500551641af78aa739c4f1c46";

nftIssue(space, tokenName, symbol, peer, address, privateKey)
  .then((result) => {
    console.log("Success, Final Result:", result); // Log the final result after calling the function
  })
  .catch((error) => {
    console.error("Final Error:", error); // Log any errors encountered during the call
  });
