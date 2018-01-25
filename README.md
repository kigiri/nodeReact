# *NodeJS/React*

## Comment tester

Avoir nodejs 8.6+ (qui supporte Async / Await et le spread sur les objets).

Environement:
* `MAILGUN_APIKEY=key-xxxxxxx`
* `MAILGUN_DOMAIN=example.com`
* `GIFTS_STORE_PATH=some/path` **(Optionnel)**

![yeah christmas](https://media.giphy.com/media/11EjiLDatd0syA/giphy.gif)

## Fais ta liste au Père Noël !

![type](https://media.giphy.com/media/RRerwvHrb0nxm/giphy.gif)

## Instructions
Forker le repo.
A la fin du test, il faire une *PR**. 

Le dépôt contient les répertoires suivants:
* `front/` : Le projet en React (généré _via_ `create-react-app`)
* `back/` : Le projet NodeJS (généré _via_ `express --pug --git`)

## Étape 1 - le back

Pour la partie back tu auras trois routes principales sur le `/` : 

* `GET /` : Récupération des cadeaux
* `POST /` : Création du cadeau 
* `DELETE /` : Suppression du cadeau 

Pour les données, tu as un fichier `/models/Gift.js`, tu peux repartir de ce fichier ou le supprimer, libre à toi de l'utiliser. Pour stocker les données, plusieurs solutions s'offrent à toi : 
* Une base MongoDB avec `Mongoose`
* Une base SQLite avec `Sequelize`
* Une base MySQL avec le module `MySQL`
* Un fichier json qui tu iras éditer _via_ le module `fs`

## Étape 2 - le front

Pour le front tu devras : 
* Afficher l'ensemble des cadeaux 
* Ajouter la possibilité d'ajouter un cadeau _via_ le formulaire présent
* Au clic sur la croix du cadeau, pouvoir le supprimer 

### Sympa une belle liste, mais l'idée, c'est quand même que Santa la reçoive non ?
  
* En utilisant NodeMailer, envoie un mail à ton Santa préféré, voilà son adresse: florian@wildcodeschool.fr)

![joy](https://media.giphy.com/media/26n62j7cS0aZOYCu4/giphy.gif)
