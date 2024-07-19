from flask import Flask, request, jsonify
from transformers import AutoProcessor, LlavaForConditionalGeneration 
from transformers import BitsAndBytesConfig                                                            
import torch
from PIL import Image
import io

quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    low_cpu_mem_usage=True,
    bnb_4bit_compute_dtype=torch.float16
)

app = Flask(__name__)

model_id = "llava-hf/llava-1.5-7b-hf"

processor = AutoProcessor.from_pretrained(model_id)
model = LlavaForConditionalGeneration.from_pretrained(model_id, quantization_config=quantization_config, device_map="auto")
     

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    
    # Read and process the image
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    inputs = processor(images=image, return_tensors="pt").to('cpu')
    
    # Generate text from the image
    outputs = model.generate(**inputs)
    text = processor.batch_decode(outputs, skip_special_tokens=True)[0]

    return jsonify({"text": text})

if __name__ == '__main__':
    app.run(debug=True)
