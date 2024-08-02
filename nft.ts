import { nftBalanceOf } from "./xrc721/nft-balance-of";
import { nftGetInfo } from "./xrc721/nft-get-info";
import { nftIssue } from "./xrc721/nft-issue";
import { nftMint } from "./xrc721/nft-mint";
import { publishNft } from "./xrc721/publish-nft-contracts";

// const peer = "test.saseul.net";
const peer = "43.225.140.61";
// const owner = "d342c6ba0a7ff35607e29bb3550e134a0c45eb5fd55f";
const address = "cd32734211d10abaab69d2d7cee927b09b15b5bbb52b";
const privateKey =
  "eef6ecd35a4c70520ffaecf2b3d84e2160c5389500551641af78aa739c4f1c46";
// const privateKey =
//   "67a33840282655346d047e6c83cce778a8477199d624f2834a8eb6df2ec71031";
const space = "hansNftTest";

// generate unique token id
function generateUniqueTokenId(): string {
  return Math.floor(Date.now() / 1000).toString();
}

async function main(
  space: string,
  peer: string,
  address: string,
  privateKey: string
) {
  // const publish = await publishNft(space, peer, address, privateKey);

  // if (publish) {
  //   console.error(publish.method, " 에서 이런 에러", publish.msg);
  //   return;
  // }

  // const res = await nftIssue(space, "MY NFT", "mt", peer, address, privateKey);

  // console.log("nftIssue: ", res);

  const uniqueTokenId = generateUniqueTokenId();

  const mintRes = await nftMint(
    space,
    "NFT 2", // name of nft
    uniqueTokenId, // token id
    "test leo token01", //description
    "my data leo1", // data
    "ext03", // extension
    peer,
    address,
    privateKey
  );

  console.log("nftMint: ", mintRes);

  const getInfoRes = await nftGetInfo(space, "2", peer, address, privateKey);
  console.log("nftGetInfo: ", getInfoRes);

  const balance = await nftBalanceOf(
    space,
    "cd32734211d10abaab69d2d7cee927b09b15b5bbb52b",
    peer,
    address,
    privateKey
  );
  console.log("balance: ", balance);
}

main(space, peer, address, privateKey);
