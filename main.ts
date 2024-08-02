import { publishToken } from "./tools/publish-token-contracts";
import { mintToken } from "./tools/token-mint";

// const peer = "test.saseul.net";
const peer = "43.225.140.61";
const owner = "d342c6ba0a7ff35607e29bb3550e134a0c45eb5fd55f";
const address = "cd32734211d10abaab69d2d7cee927b09b15b5bbb52b";
const privateKey =
  "eef6ecd35a4c70520ffaecf2b3d84e2160c5389500551641af78aa739c4f1c46";
// const privateKey =
//   "67a33840282655346d047e6c83cce778a8477199d624f2834a8eb6df2ec71031";
const space = "test45552225";

async function main(
  space: string,
  peer: string,
  address: string,
  privateKey: string
) {
  const publish = await publishToken(space, peer, address, privateKey, owner);

  if (publish) {
    console.error(publish.method, " 에서 이런 에러", publish.msg);
    return;
  }

  const res = await mintToken(
    space,
    "TestToken001",
    "t3",
    "1000000000000000000000",
    18,
    peer,
    address,
    privateKey
  );

  console.log("res: ", res);
}

main(space, peer, address, privateKey);
