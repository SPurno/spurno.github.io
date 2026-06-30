// ============================================
// ShopVerse — Encrypted Database Credentials
// ============================================
// These credentials are XOR-obfuscated to prevent
// casual viewing in the source code. They are
// decoded at runtime to initialize the Turso client.

const _CREDENTIALS = (() => {
  const KEY = 'ShoPv3r$3cr3tK3y!2026';

  function xorDecrypt(hex, key) {
    let result = '';
    for (let i = 0; i < hex.length; i += 2) {
      const charCode = parseInt(hex.substring(i, i + 2), 16) ^ key.charCodeAt((i / 2) % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  }

  return {
    url: xorDecrypt(
      '3f010d23075f480b1c06115c1926560b42575c5d517e1b1f25045d1d0a5214011e01381e1c4041441f077d1c1a22055c5c4d5c',
      KEY
    ),
    authToken: xorDecrypt(
      '361125381474114d7c0a38752e0e612d706179417f3d3a5a33357a446d58132a6537010a57444b7a5a7f3907063318501b687029026a2c1a5a364b77037d721a5c222a11073f4e66103b5e18207a134e5b7d767366320515437d086d47391f6203066049126874705d1f3f293b38643f507d3423062d1f58037b65790278292a03191f441b45010f197a1e245a20125656655b245d3b6338402416750d3c7532206613777a6a67786326033c4451431d7e371957181e5e201061646b07312d35063b6b20677c203b403d2579097b7179047f3e3e05090c71186a59000a7f231e4a344c7f447c7212583629475b284e7d0e3e642d31693d6f5e7e587367273b3b43691b6e0a4d465c003d740c177f4275543b270d673c4302606214216b3c136b0a76767b54033e012b2742003d46525b3f00471e060e737c44790e172b570a000136097e4e40021a0e051f4e00535657292a05111171464954273362',
      KEY
    )
  };
})();
