#!/usr/bin/env python3
"""Crea un ZIP versionado y reproducible de los recursos públicos de ez-ui."""
import argparse
from pathlib import Path
import re
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
FILES = ("icons.svg", "LICENSE-lucide.txt")
DIRS = ("css", "js", "fonts")

def build(version, output):
    if not re.fullmatch(r"\d+\.\d+\.\d+", version):
        raise ValueError("La versión debe tener formato X.Y.Z")
    paths = [ROOT / name for name in FILES]
    for directory in DIRS:
        paths.extend(p for p in (ROOT / directory).rglob("*") if p.is_file())
    paths = sorted(paths, key=lambda p: p.relative_to(ROOT).as_posix())
    if not all(p.is_file() for p in paths) or not all((ROOT / d).is_dir() for d in DIRS):
        raise FileNotFoundError("Faltan archivos de la biblioteca")
    output.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(output, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
        for path in paths:
            name = "ez-ui/" + path.relative_to(ROOT).as_posix()
            info = ZipInfo(name, date_time=(2020, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, path.read_bytes(), compress_type=ZIP_DEFLATED, compresslevel=9)
        info = ZipInfo("ez-ui/VERSION", date_time=(2020, 1, 1, 0, 0, 0))
        info.compress_type = ZIP_DEFLATED
        info.external_attr = 0o644 << 16
        archive.writestr(info, version + "\n")
    print(output)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("version")
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    build(args.version, args.output)
