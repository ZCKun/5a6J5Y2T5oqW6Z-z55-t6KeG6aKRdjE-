import pandas as pd
import numpy as np
from pandas._libs.tslibs.timestamps import Timestamp

def get(df) -> pd.DataFrame:
    retdf = pd.DataFrame()
    for i in range(0, len(df)-1):
        nl = df.iloc[i]['issue_d']
        if isinstance(nl,Timestamp):
            if nl.year == 2017:
                retdf.append(df.iloc[i], ignore_index=True)
    return retdf

if __name__ == '__main__':
    df = pd.read_excel('<xlsx文件路径>')
    _df = np.array_split(df, 10000)  # 将数据切割为一万份
    get(_df[0]).to_excel('output.xlsx')
