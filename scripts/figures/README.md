# Figures

## Instructions

### Installation
Figure generation is handled by python if you do not have a python interpreter or the pip package manager they can be downloaded [here](https://www.python.org/downloads/)
1. install required python packages
```shell
python -m pip install -r requirements.txt
```
2. Figure generation requires database access, if you haven't setup database environmental variables please refer to the main README for instructions
### Usage
To run figure generation:
```shell
python generate_figures.py
```
This will save and display a graph which represents the usage of the record function over time.