#!/bin/bash

echo "Setting up CI/CD for RForms..."

# Install the systemd service
echo "Installing systemd service..."
sudo cp rforms.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable rforms
sudo systemctl start rforms

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository: https://github.com/rajlivingston/rforms"
echo "2. Navigate to Settings > Secrets and variables > Actions"
echo "3. Add the following secrets:"
echo "   - EC2_HOST: 3.110.169.59 (your EC2 public IP)"
echo "   - EC2_USERNAME: ec2-user"
echo "   - EC2_SSH_KEY: (paste your private SSH key)"
echo ""
echo "4. Push the changes to GitHub:"
echo "   git add .github/workflows/deploy.yml"
echo "   git commit -m 'Add CI/CD pipeline'"
echo "   git push origin main"
echo ""
echo "5. The pipeline will run automatically on every push to main branch"
echo ""
echo "To check service status: sudo systemctl status rforms"
echo "To view logs: sudo journalctl -u rforms -f"
