# Avatar Placeholder #

### API ###
Read more guidance in the [Document](https://avatar-placeholder.iran.liara.run/).

**Generate random user profile pictures to use as placeholders for your prototypes and design projects.**
**To use the avatars in your project, use the following URLs:**

#### 1) Random avatar
```
https://avatar.iran.liara.run/public
```
<img src="https://avatar.iran.liara.run/public" width="65">

#### 2) Random boy avatar
```
https://avatar.iran.liara.run/public/boy
```
<img src="https://avatar.iran.liara.run/public/boy" width="65">

#### 3) Random girl avatar
```
https://avatar.iran.liara.run/public/girl
```
<img src="https://avatar.iran.liara.run/public/girl" width="65">

#### 4) Unique avatar by id
View the ID of the avatars: [All avatars](https://avatar-placeholder.iran.liara.run/avatars)
```
https://avatar.iran.liara.run/public/[ID]
```
*example: ID=60*
<br>
<br>
<img src="https://avatar.iran.liara.run/public/60" width="65">

#### 5) Avatar based on username
###### genral
```
https://avatar.iran.liara.run/public?usearname=[value]
```
*example: usearname=Jordan*
<br>
<br>
<img src="https://avatar.iran.liara.run/public?username=Jordan" width="65">

###### boy
```
https://avatar.iran.liara.run/public/boy?usearname=[value]
```
*example: usearname=Scott*
<br>
<br>
<img src="https://avatar.iran.liara.run/public/boy?username=Scott" width="65">

###### girl
```
https://avatar.iran.liara.run/public/girl?username=[value]
```
*example: username=Angela*
<br>
<br>
<img src="https://avatar.iran.liara.run/public/girl?username=Angela" width="65">

### Soccer Player Avatars

Soccer avatars are isolated from boy/girl/id/job endpoints and are only available via the routes below.

#### 6) Random soccer avatar
```
https://avatar.iran.liara.run/public/soccer
```

#### 7) Soccer avatar by id
View the list of players: `GET /api/soccer`
```
https://avatar.iran.liara.run/public/soccer/[ID]
```
*example: ID=6 (Lionel Messi)*

#### 8) List soccer players
```
https://avatar.iran.liara.run/api/soccer
```
Returns `{ players: [{ id, name, tier, file, url }, ...] }` for 50 players (tiers 20 / 35 / 50 / 75 / 100).

### Avatars With Initials From Names
Avatars initials, also known as profile pictures with initials, are typically the first letters of a user's name displayed within an avatar icon the ability to change the background color, text color, size, etc
[(view all options)](https://avatar-placeholder.iran.liara.run/document/name/#more-option).
```
https://avatar.iran.liara.run/username?username=[firstname+lastname]
```
*example: username=Scott Wilson*
<br>
<br>
<img src="https://avatar.iran.liara.run/username?username=Scott+Wilson" width="65">

### Game-Style Rings

Add a decorative prestige ring around any avatar with the optional `ring` query parameter. Works on all avatar endpoints (public id/boy/girl/soccer/job and username initials). Use a ring **slug** or **id** (1–8). Invalid values are ignored and the plain avatar is returned.

Rings are composited from professional PNG overlays (gear, crystal, wings, fire, soccer, energy, royal).

```
https://avatar.iran.liara.run/public/60?ring=gold
https://avatar.iran.liara.run/public/boy?ring=3
https://avatar.iran.liara.run/public/soccer/1?ring=soccer
https://avatar.iran.liara.run/username?username=Scott+Wilson&ring=royal
```

#### List available rings
```
https://avatar.iran.liara.run/api/rings
```
Returns `{ rings: [{ id, slug, name }, ...] }`:

| ID | Slug | Name |
|----|------|------|
| 1 | bronze | Bronze Gear |
| 2 | silver | Silver Crystal |
| 3 | gold | Gold Wings |
| 4 | fire | Fire |
| 5 | soccer | Soccer Neon |
| 6 | soccer-trail | Soccer Trail |
| 7 | energy | Energy Orbit |
| 8 | royal | Royal Crown |

When a ring is applied, the response is always PNG.

<hr/>

### [Support API](https://avatar-placeholder.iran.liara.run/donate) ###
your support ensures our API’s long and happy life. Devs and businesses relying on it will thank you. Thanks for being part of our digital adventure! 😊
