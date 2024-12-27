import { useState } from "react";
import Header from "../../components/Header/index";
import background from "../../assets/background.png";
import ItemList from "../../components/itemList/index";
import "./styles.css";

function App() {
    const [user, setUser] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [repos, setRepos] = useState(null);

    const handleSearchUser = async () => {
        const userData = await fetch(`https://api.github.com/users/${user}`);
        const newUser = await userData.json();

        if (newUser.message === "Not Found") {
            alert("Usuário não encontrado!");
            return;
        }

        if (newUser.name) {
            const { avatar_url, name, bio, login } = newUser;
            setCurrentUser({ avatar_url, name, bio, login });

            const reposData = await fetch(
                `https://api.github.com/users/${user}/repos`
            );

            const newRepos = await reposData.json();
            if (newRepos.length) {
                setRepos(newRepos);
            }
        }
    };
    return (
        <div className="App">
            <Header />
            <main>
                <img src={background} className="bkg-img" alt="Background" />
                <div className="content">
                    <div>
                        <h1>Welcome to GitFind</h1>
                        <input
                            type="text"
                            placeholder="@username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <button onClick={handleSearchUser}>Search</button>
                    </div>
                    {currentUser?.name ? (
                        <>
                            <div className="profile">
                                <img
                                    src={currentUser.avatar_url}
                                    className="profile-img"
                                    alt="profile"
                                />
                                <div>
                                    <h3>{currentUser.name}</h3>
                                    <span>@{currentUser.login}</span>
                                    <p>Descrição : {currentUser.bio}</p>
                                </div>
                            </div>
                            <hr />
                        </>
                    ) : null}
                    {repos?.length ? (
                        <div>
                            <h4 id="title-rep">Repositorios</h4>
                            {repos.map((repo) => (
                                <ItemList key={repo.id}
                                    title={repo.name}
                                    description={repo.description}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
}
export default App;
