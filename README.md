# Smart Lib

This is a really simple book management app done using smart contracts, this was done following some tutorials but mostly with [Kavit Mehta's Blockchain course on Udemy](https://www.udemy.com/share/1061Ng3@uyg6_AQ71yF0zQWLlqBSZLXm9eToRk9U3i3poXxdVCUNR6qzSTJgaN0cQOe_dLP-bA==/) course.

### Requisites

- Node 16
- A [Metamask](https://metamask.io/) account
- An [Alchemy](https://www.alchemy.com/) account

## Configuring the Project

1. First of all make sure all dependencies are installed:

```
npm install
```

2. Then copy your `.env.tpl` to `.env` and add your `ALCHEMY_ARBITRUM_RINKEBY_URL` , `ARBITRUM_RINKEBY_PRIVATE_KEY` & `ARBISCAN_API_KEY` keys:

```
cp .env.tpl .env
vim .env
```

_Note: you can get those values by following [this article](https://docs.alchemy.com/alchemy/introduction/getting-started/sending-txs#6.-create-the-.env-file)._

3.  Then build your project

```
npm run build
```

## Deploying Contracts to Rinkeby

```
npm run deploy:rinkeby
```

## Testing

```
npm run test
```