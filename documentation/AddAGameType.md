# Add a GameType

## Player Game Info

1. create a File named *Gg*PlayerGameInfo in the PlayerGameInfo folder
2. in the file create a classes named *Gg*PlayerGameInfo that extends PlayerGameInfo
   
   ```export class GgPlayerGameInfo extends PlayerGameInfo```

3. this class needs a readonly property in the constructor for each information returned from the api and should give the point value to the super constructor

4. also create a class named *Gg*PlayerGameInfoFactory that extends PlayerGameInfoFactory<*GG*PlayerGameInfo>

   ```export class GgPlayerGameInfoFactory extends PlayerGameInfoFactory<GgPlayerGameInfo>```
   
5. this class needs a private property for each information returned from the api, except points

6. also it should have a public function for each of these information that sets the value and returns `this`

7. the `create()` method should create a new instance of *Gg*PlayerGameInfo and give the values of the private variables to the constructor

8. the `fromResponse()` method should convert the data from the api to have the right types and call all of the member functions to set the properties. Also it should test if the response is a 404 and also needs to call points. It returns `this`.

9. the file needs to be added to the exports in the `main.ts` file

   ```export * from "./PlayerGameInfo/GgPlayerGameInfo"```

10. the factory also needs to be returned by the method `playerGameInfoFactoryForGametype` of `Factory.ts` for this there needs to be added a new case with the GameTypes id of the factory. The information should also be added to the comment:

```
case GameTypes.GG.id:
	return GgPlayerGameInfoFactory;
```

11. a test case should also be added to `PlayerGameInfoFactory.test.ts` through adding an entry to the set `tests` that should be an array of the GameType, an instance of *Gg*PlayerGameInfo and an instance of *Gg*PlayerGameInfoFactory
