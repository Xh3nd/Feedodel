## Excel → XML Converter Backend (Python / FastAPI)

This is a small backend service that accepts an Excel file (`.xlsx`) and returns XML.  
It is designed so you can plug in different XML formats for different target platforms.

### Setup

1. **Create & activate a virtual environment (recommended)**:

```bash
cd /Users/administrator08122025/feedodel
python -m venv .venv
source .venv/bin/activate  # on Windows: .venv\Scripts\activate
```

2. **Install dependencies**:

```bash
pip install -r requirements.txt
```

3. **Run the API (development)**:

```bash
uvicorn app.main:app --reload
```

The server will start on `http://127.0.0.1:8000`.

### Usage

- **Health check**

  - `GET /health` → `{"status": "ok"}`

- **Convert Excel to XML**

  - Endpoint: `POST /convert`
  - Form-data:
    - `file`: uploaded `.xlsx` file
    - `platform` (optional query param, default: `default`)

You can test quickly with `curl`:

```bash
curl -X POST "http://127.0.0.1:8000/convert?platform=default" \
  -H "accept: application/xml" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/your.xlsx" \
  -o output.xml
```

### Adding platform-specific XML formats

All conversion logic lives in `app/services/converter.py`.

- Register a new platform key in the `PLATFORM_CONVERTERS` dict.
- Implement a function that receives an `openpyxl` workbook and returns an `lxml.etree.Element` root node shaped exactly as your platform requires.

Later, when you share the exact XML rules for your platforms, we can create dedicated converter functions for each one.


