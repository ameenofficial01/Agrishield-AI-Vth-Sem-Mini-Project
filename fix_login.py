with open('src/pages/LoginPage.tsx', 'r') as f:
    content = f.read()

# find first occurrence
idx = content.find('import { useState } from "react";')
if idx != -1:
    # replace all others
    rest = content[idx + len('import { useState } from "react";'):]
    rest = rest.replace('import { useState } from "react";', '')
    with open('src/pages/LoginPage.tsx', 'w') as f:
        f.write(content[:idx + len('import { useState } from "react";')] + rest)
