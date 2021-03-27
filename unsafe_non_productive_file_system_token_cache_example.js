// IMPORTANT: DO NOT USE THIS IMPLEMENTATION IN PRODUCTION
// IT IS NOT SECURE AND DOES NOT ALLOW YOU TO SCALE HORIZONTALLY

const fs = require('fs').promises;

module.exports = class UnsafeNonProductiveFileSystemTokenCacheExample {
    async has(key) {
        return !!(await this.get(key));
    }

    async get(key) {
        try {
            const tokens = JSON.parse(
                await fs.readFile("./cache.json", "utf8")
            );

            return tokens[key];
        } catch (err) {
            return null;
        }
    }

    async save(key, value) {
        let tokens = {};
        try {
          tokens = JSON.parse(await fs.readFile("./cache.json", "utf8"));
        } catch (e) {
          tokens = {};
        }
  
        tokens[key] = value;
        await fs.writeFile("./cache.json", JSON.stringify(tokens), "utf8");
      }
}