import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';

const JsonPathFinder = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonPath, setJsonPath] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const evaluateJsonPath = () => {
    try {
      if (!jsonInput.trim() || !jsonPath.trim()) {
        setResult('');
        setError('');
        return;
      }

      const parsedJson = JSON.parse(jsonInput);
      let pathParts = jsonPath.split('.');
      let current = parsedJson;
      
      // Handle root object reference
      if (pathParts[0] === '$') {
        pathParts.shift();
      }
      
      for (const part of pathParts) {
        // Handle array indexing like users[0]
        if (part.includes('[') && part.includes(']')) {
          const arrayName = part.substring(0, part.indexOf('['));
          const indexStr = part.substring(part.indexOf('[') + 1, part.indexOf(']'));
          const index = parseInt(indexStr, 10);
          
          if (current[arrayName] === undefined) {
            throw new Error(`Path part '${arrayName}' not found`);
          }
          
          if (!Array.isArray(current[arrayName])) {
            throw new Error(`'${arrayName}' is not an array`);
          }
          
          if (index < 0 || index >= current[arrayName].length) {
            throw new Error(`Index ${index} out of bounds for array '${arrayName}'`);
          }
          
          current = current[arrayName][index];
        } else {
          if (current[part] === undefined) {
            throw new Error(`Path part '${part}' not found`);
          }
          current = current[part];
        }
      }
      
      setResult(JSON.stringify(current, null, 2));
      setError('');
    } catch (err) {
      setError(`Error: ${err.message}`);
      setResult('');
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      showSnackbar('Result copied to clipboard', 'success');
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setJsonPath('');
    setResult('');
    setError('');
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            JSON Data:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            placeholder="Paste your JSON here..."
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              setError('');
            }}
            error={!!error}
            sx={{
              fontFamily: '"Fira Code", monospace',
              '& .MuiInputBase-input': {
                fontFamily: '"Fira Code", monospace',
              },
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            JSON Path:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter JSON path (e.g., $.users[0].name or users[0].name)"
            value={jsonPath}
            onChange={(e) => setJsonPath(e.target.value)}
            onBlur={evaluateJsonPath}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                evaluateJsonPath();
              }
            }}
            sx={{
              fontFamily: '"Fira Code", monospace',
              '& .MuiInputBase-input': {
                fontFamily: '"Fira Code", monospace',
              },
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">
              Result:
            </Typography>
            <Box>
              <Tooltip title="Copy to Clipboard">
                <span>
                  <IconButton onClick={handleCopy} size="small" disabled={!result}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Clear All">
                <span>
                  <IconButton onClick={handleClear} size="small" disabled={!jsonInput && !jsonPath && !result}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Box>
          <Paper 
            variant="outlined" 
            sx={{
              minHeight: '120px',
              maxHeight: '200px',
              overflow: 'auto',
              p: 2,
              backgroundColor: 'background.paper',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {error ? (
              <Typography color="error" variant="body2">{error}</Typography>
            ) : result ? (
              result
            ) : (
              <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CodeIcon sx={{ mr: 1, opacity: 0.7 }} />
                <Typography variant="body2">
                  Result will appear here
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          JSON Path Examples:
        </Typography>
        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
          <ul>
            <li><code>users[0].name</code> - Access the name of the first user in an array</li>
            <li><code>settings.theme.colors.primary</code> - Access nested properties</li>
            <li><code>$.data.items[2].id</code> - Using $ to reference the root object</li>
          </ul>
        </Typography>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          elevation={4}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JsonPathFinder;
