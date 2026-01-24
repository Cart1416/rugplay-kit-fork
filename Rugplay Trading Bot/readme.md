# Rugplay Trading BoT

This is a Python toolkit for Rugplay.com. It has scripts that help you trade coins, sell your portfolio, and kinda automate stuff so you don’t have to do everything manually. Made for the community, by the community.

⚠️ **Important:** Use this responsibly. It’s meant for learning and fun. Don’t share your private info and maybe test on small accounts first.

---

## What’s in here

* **`main.py`** – Automatically buys and sells coins to keep a pool balanced.
* **`sell_all.py`** – Sells all your coins safely, except for ones you want to keep.
* **`requirements.txt`** – Install all the Python packages you need.

---

## How to Use

1. **Clone this folder**

```bash
git clone https://github.com/your-username/rugplay-kit.git
cd rugplay-kit/Rugplay\ Trading\ BOT
```

2. **Install the packages**

```bash
pip install -r requirements.txt
```

3. **Set up your environment variables**
   You’ll need:

```
CF_CLEARANCE=<your cf_clearance cookie>
SECURE_BETTER_AUTH=<your session token>
USER_AGENT=<your browser user-agent string>
```

Tip: use a `.env` file with `python-dotenv` if you want.

4. **Run the scripts**

```bash
python main.py
# or
python sell_all.py
```

---

## Safety Tips

* Test with small amounts first.
* Always use **env variables**, not hard-coded tokens.
* Keep an eye on what the scripts are doing.
* Stop the script if something seems off.

---

## Contributing

If you make a script or improvement:

* Keep it simple and easy to understand.
* Explain what it does in the comments.
* Submit a PR so the community can use it.

---

## License

MIT – Use it, share it, learn from it, just don’t be sketchy.

Do you want me to do that next?
