
<div align="center">
   <h1>SafariAdventure</h1>
   <p>A fully responsive ReactJS , Django + PostgreSql project</p>
   <a href="https://safariadventure-ke.web.app/"><strong>➥ LiveDemo</strong></a>
</div>

#### Demo Screenshot
<img src="https://res.cloudinary.com/doyu5zfek/image/upload/v1714121659/Projects/kq7cohps6q95xa5vqffz.png" />

<div align="center">
   <img src="https://img.badgesize.io/https://github.com/jaycode8/SafariAdventure.git" style="plastic"  />
   <img src="https://img.shields.io/github/stars/jaycode8/SafariAdventure?style=social" />
</div>

#### Prerequisites 
  
 Before you begin, ensure you have met the following requirements: 
 <p>The following packages must be installed in your system.</p>
  
 * [Git](https://git-scm.com/downloads "Download Git") 
 * [Python](https://www.python.org/downloads/)
 * [Node js](https://nodejs.org/en/download/)
 * [PostgreSQL](https://www.postgresql.org/download/)
  
 #### Run Online
 Hit the LiveDemo button above
  
 #### Run Locally 
  
 To run **this Adventure project** locally, run this command on your git bash: 
  
 Linux and macOS: 
  
 ```bash 
 sudo git clone https://github.com/jaycode8/SafariAdventure.git
 ``` 
  
 Windows: 
  
 ```bash 
 git clone https://github.com/jaycode8/SafariAdventure.git
 ```

Head to the directory where the project was downloaded

Run folowing commands in the terminal or cmd
 ```
 cd SafariAdventure
 ```

Lets setup the Server first

 ```
 cd Server
 ```
Start the python environment 
Windows:
 ```
 .\env\Scripts\activate
 ```
Unix:
 ```
 source env/bin/activate
 ```
Install required dependancies
```
 pip install
 ```
Start up the PostgreSQL and create SafariAdventure db
Finally run the server
```
 python manage.py runserver
 ```

Now that the server is running lets config the Client

 ```
 cd ../
 cd Client
 npm install
 ```


Open [http://localhost:5180](http://localhost:5180) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### License 
  
 This project is **free to use** and does not contains any license.









