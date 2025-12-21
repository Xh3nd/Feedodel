from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import Response

from .services.converter import convert_excel_to_xml


app = FastAPI(
    title="Excel to XML Converter",
    description="Upload an Excel file and get XML formatted for specific platforms.",
    version="0.1.0",
)


@app.post("/convert", summary="Convert Excel to XML")
async def convert(
    file: UploadFile = File(..., description="Excel file (.xlsx)"),
    platform: str = "default",
):
    # Basic validation
    if not file.filename.lower().endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="Only .xlsx files are supported.")

    content = await file.read()
    try:
        xml_bytes = convert_excel_to_xml(content, platform=platform)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # In real app you might log this
        raise HTTPException(status_code=500, detail="Failed to convert file to XML.")

    return Response(content=xml_bytes, media_type="application/xml")


@app.get("/health", summary="Health check")
def health():
    return {"status": "ok"}


