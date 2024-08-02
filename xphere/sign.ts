import nacl from "tweetnacl";
import util from "./util";
import enc from "./enc";

interface KeyPairResult {
  private_key: string;
  public_key: string;
  address: string;
}
class Sign {
  KEY_SIZE = 64;
  SIGNATURE_SIZE = 128;

  keyPair() {
    let pair = nacl.sign.keyPair();
    let result: KeyPairResult = {
      private_key: util.byteToHex(pair.secretKey).slice(0, this.KEY_SIZE),
      public_key: util.byteToHex(pair.publicKey),
      address: this.address(util.byteToHex(pair.publicKey)),
    };

    // result.private_key = util.byteToHex(pair.secretKey).slice(0, this.KEY_SIZE);
    // result.public_key = util.byteToHex(pair.publicKey);
    // result.address = this.address(result.public_key);

    return result;
  }

  privateKey() {
    return util
      .byteToHex(nacl.sign.keyPair().secretKey)
      .slice(0, this.KEY_SIZE);
  }

  publicKey(private_key) {
    return util.byteToHex(
      nacl.sign.keyPair.fromSeed(util.hexToByte(private_key)).publicKey
    );
  }

  address(public_key) {
    return enc.idHash(public_key);
  }

  signature(obj, private_key) {
    return util.byteToHex(
      nacl.sign.detached(
        util.stringToByte(enc.string(obj)),
        util.hexToByte(private_key + this.publicKey(private_key))
      )
    );
  }

  signatureValidity(obj, public_key, signature) {
    return (
      signature.length === this.SIGNATURE_SIZE &&
      enc.isHex(signature) === true &&
      nacl.sign.detached.verify(
        util.stringToByte(enc.string(obj)),
        util.hexToByte(signature),
        util.hexToByte(public_key)
      )
    );
  }
}

export default new Sign();
