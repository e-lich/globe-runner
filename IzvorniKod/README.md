1. otvori VSC i terminal iz njega u globerunnerrepo repozitoriju
2. git pull
3. git checkout project-skeleton-setup
4. ako ste kao lovro i niste nista updeatali i instalirali tri godine instalirajte python na koji vec nacin ide na vasem kompu i ugasi pa upali terminal
5. cd IzvorniKod/backend
6. pip3 install pipenv
7. pipenv sync
8. ctrl+shift+p i search python: select interpreter
9. kopiraj virtualenv location iz terminala i pasteaj gore kao interpreter
11. cd u frontend
12. npm install
13. otvori pgadmin4
14. napravi novu bazu globe-runner
15. odi u VSC u IzvorniKod/backend/app.py i editaj onaj link kako je tamo napisano sa svojim passwordom
16. otvori novi terminal u VSC
17. cd u backend
18. samo napisi “python” i stisni enter da te prebaci u python terminal
19. from app import db (ovo nisam sigurna jel potrebno al sigurno ne skodi pa neka je)
20. otvori novi terminal i cd u backend
21. flask run
22. otvori localhost:5000 u browseru i nadaj se da vidis Hello Backend!
23. ako ne, hit uppaj Elu
24. otvori novi terminal i cd u frontend
25. npm start
26. otvori localhost:3000 i nadaj se da vidis Hello Frontend!
27. ako ne, hit uppaj Elu