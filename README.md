# Democratiz Art Dapp
Investing in Real World Art with Fractional NFTs

## Projet de groupe de la formation développeur ethereum ALyra
Créé avec React, Hardhat et Ethers

# Installation de l'environnement
1. Création de l'application sur React : 
$ npx create-react-app Democratiz_Art
2. Installation Ethers et Hardhat
$ npm install ethers hardhat @nomicfoundation/hardhat-chai-matchers chai @nomiclabs/hardhat-ethers
3. Création de l'environnement hardhat : 
$ npx hardhat
4. Installation de dotenv et création d'un fichier .env pour y intégrer des variables d'environnement (Api Key d'Alchemy et PrivateKey des comptes)
$ npm install dotenv
5. hardhat.config.js : modification des paramètres de networks pour travailler sur les testnet mumbai et goerli(avec un clé alchemy)
6. Installer les contrats openzeppelin : 
$ npm install @openzeppelin/contracts
7. Deploiement du smart contract - exemple plateforme goerli : 
$ npx hardhat run scripts/deploy.js --network goerli
6. Pour lancer une blockchain en localhost : 
$ npx hardhat node
7. Pour lancer l'application : 
$ npm start

# Tests unitaires
Un seul test réalisé.

# Utilisation de l'application
1. L'application est consultable par tous, mais aucune intéraction n'est possible sans connexion avec un wallet.
2. Tout personne connectée avec un wallet peut acheter les NFTs proposés sur la plateforme.
3. La mise en vente de NFTs sur la plateforme est soumis à autorisation de Democratiz_Art. L'inscription se fait via un formulaire google forms disponible en bas de page (bouton "Rejoignez Nous").
4. Fonctionnalités débloquées en fonction de l'utilisateur :
   * SuperAdmin (uniquement le compte qui déploie le contrat) : Enregistrement des Administrateurs, Enregistrement des Artistes, Création de NFTs, Achat de NFTs
   * Admin : Enregistrement des Artistes, Création de NFTs, Achat de NFTs
   * Artiste : Création de NFTs, Achat de NFTs
   * Amateur d'Art : Achat de NFTs

# Fonctionnalités non accessibles et prévues dans la version 2 de la Dapp
1. Page de revente d'un NFTs acheté sur la marketplate (actuellement un message "en cours de construction" est affiché).
2. Fractionnement de l'oeuvre mise en vente en plusieurs NFTs représentant chacuns un morceau de l'oeuvre.
3. Ajout d'un deuxième smart contract pour les fonctionnalités de transfert des fonds de la plateforme vers les utilisateurs et écriture du front d'interface.
4. Ajout de la gestion des royalties.

# Autres Informations
1. Vidéo de démonstration de l'application disponible ici : https://www.loom.com/share/b6e7ed94dc374917b63b2e0b72266ac6
2. Application visible depuis Vercel : https://democratiz-art.vercel.app/home
3. L'application est déployée sur le testnet Goerli à l'adresse ci-après : https://goerli.etherscan.io/address/0xD564fA75Ec1e2fE39A60D7c3F5068Eb6D27F39B8
4. L'application est déployée sur le testnet Mumbai à l'adresse ci-après :
democratiz_art deployed to: https://mumbai.polygonscan.com/address/0xBC114e0Bf71Cf024fDC78e089288B431be53e87A